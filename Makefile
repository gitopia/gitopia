#!/usr/bin/make -f

include scripts/makefiles/localnet.mk

APPNAME := gitopiad
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
COMMIT := $(shell git log -1 --format='%H')

LEDGER_ENABLED ?= true
TM_VERSION := $(shell go list -m github.com/cometbft/cometbft | sed 's:.* ::') # grab everything after the space in "github.com/cometbft/cometbft v0.34.10"
BUILDDIR ?= $(CURDIR)/build

# don't override user values
ifeq (,$(VERSION))
  VERSION := $(shell echo $(shell git describe --tags) | sed 's/^v//')
  # if VERSION is empty, then populate it with branch's name and raw commit hash
  ifeq (,$(VERSION))
    VERSION := $(BRANCH)-$(COMMIT)
  endif
endif

build_tags = netgo
ifeq ($(LEDGER_ENABLED),true)
  ifeq ($(OS),Windows_NT)
    GCCEXE = $(shell where gcc.exe 2> NUL)
    ifeq ($(GCCEXE),)
      $(error gcc.exe not installed for ledger support, please install or set LEDGER_ENABLED=false)
    else
      build_tags += ledger
    endif
  else
    UNAME_S = $(shell uname -s)
    ifeq ($(UNAME_S),OpenBSD)
      $(warning OpenBSD detected, disabling ledger support (https://github.com/cosmos/cosmos-sdk/issues/1988))
    else
      GCC = $(shell command -v gcc 2> /dev/null)
      ifeq ($(GCC),)
        $(error gcc not installed for ledger support, please install or set LEDGER_ENABLED=false)
      else
        build_tags += ledger
      endif
    endif
  endif
endif

build_tags += $(BUILD_TAGS)
build_tags := $(strip $(build_tags))

whitespace :=
whitespace += $(whitespace)
comma := ,
build_tags_comma_sep := $(subst $(whitespace),$(comma),$(build_tags))

ldflags = -X github.com/cosmos/cosmos-sdk/version.Name=gitopia \
	-X github.com/cosmos/cosmos-sdk/version.AppName=gitopiad \
	-X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
	-X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT) \
	-X "github.com/cosmos/cosmos-sdk/version.BuildTags=$(build_tags_comma_sep)" \
	-X github.com/cometbft/cometbft/version.TMCoreSemVer=$(TM_VERSION)

ifeq ($(LINK_STATICALLY),true)
  ldflags += -linkmode=external -extldflags "-Wl,-z,muldefs -static"
endif
ifeq (,$(findstring nostrip,$(GITOPIA_BUILD_OPTIONS)))
  ldflags += -w -s
endif
ldflags += $(LDFLAGS)
ldflags := $(strip $(ldflags))

BUILD_FLAGS := -tags "$(build_tags)" -ldflags '$(ldflags)'
# check for nostrip option
ifeq (,$(findstring nostrip,$(GITOPIA_BUILD_OPTIONS)))
  BUILD_FLAGS += -trimpath
endif

build = GOOS=$(1) GOARCH=$(2) go build -mod=readonly $(BUILD_FLAGS) -o $(BUILDDIR) ./...
tar = cd build && tar -cvzf $(APPNAME)_$(VERSION)_$(1)_$(2).tar.gz $(APPNAME)$(3) && \
    rm $(BUILDDIR)/$(APPNAME)$(3)
zip = cd build && zip $(APPNAME)_$(VERSION)_$(1)_$(2).zip $(APPNAME)$(3) && \
    rm $(BUILDDIR)/$(APPNAME)$(3)

.PHONY: build

BUILD_TARGETS := build install

build: BUILD_ARGS=-o $(BUILDDIR)/

$(BUILD_TARGETS): go.sum $(BUILDDIR)/
	go $@ -mod=readonly $(BUILD_FLAGS) $(BUILD_ARGS) ./...

$(BUILDDIR)/:
	mkdir -p $(BUILDDIR)/

all: $(BUILDDIR) windows darwin linux git_release_tar_gz git_release_zip

##### LINUX BUILDS #####
linux: $(BUILDDIR) build/$(APPNAME)_$(VERSION)_linux_arm.tar.gz build/$(APPNAME)_$(VERSION)_linux_arm64.tar.gz build/$(APPNAME)_$(VERSION)_linux_386.tar.gz build/$(APPNAME)_$(VERSION)_linux_amd64.tar.gz

build/$(APPNAME)_$(VERSION)_linux_386.tar.gz:
	$(call build,linux,386,)
	$(call tar,linux,386)

build/$(APPNAME)_$(VERSION)_linux_amd64.tar.gz:
	$(call build,linux,amd64,)
	$(call tar,linux,amd64)

build/$(APPNAME)_$(VERSION)_linux_arm.tar.gz:
	$(call build,linux,arm,)
	$(call tar,linux,arm)

build/$(APPNAME)_$(VERSION)_linux_arm64.tar.gz:
	$(call build,linux,arm64,)
	$(call tar,linux,arm64)

##### DARWIN (MAC) BUILDS #####
darwin: $(BUILDDIR) build/$(APPNAME)_$(VERSION)_darwin_amd64.tar.gz build/$(APPNAME)_$(VERSION)_darwin_arm64.tar.gz

build/$(APPNAME)_$(VERSION)_darwin_arm64.tar.gz:
	$(call build,darwin,arm64,)
	$(call tar,darwin,arm64)

build/$(APPNAME)_$(VERSION)_darwin_amd64.tar.gz:
	$(call build,darwin,amd64,)
	$(call tar,darwin,amd64)

##### WINDOWS BUILDS #####
windows: $(BUILDDIR) build/$(APPNAME)_$(VERSION)_windows_386.zip build/$(APPNAME)_$(VERSION)_windows_amd64.zip

build/$(APPNAME)_$(VERSION)_windows_386.zip:
	$(call build,windows,386,.exe)
	$(call zip,windows,386,.exe)

build/$(APPNAME)_$(VERSION)_windows_amd64.zip:
	$(call build,windows,amd64,.exe)
	$(call zip,windows,amd64,.exe)

git_release_tar_gz:
	git archive --format=tar --prefix=$(APPNAME)-$(VERSION)/ v$(VERSION) \
		| gzip > $(BUILDDIR)/$(APPNAME)-$(VERSION).tar.gz

git_release_zip:
	git archive --format zip --output $(BUILDDIR)/$(APPNAME)-$(VERSION).zip v$(VERSION)

go.sum: go.mod
		@echo "--> Ensure dependencies have not been modified"
		GO111MODULE=on go mod verify

clean:
	rm -rf $(BUILDDIR)/

mocks:
	go install github.com/vektra/mockery/v2@latest
	mockery --name MsgClient --inpackage --case snake --dir ./x/gitopia/types
	mockery --name QueryClient --inpackage --case snake --dir ./x/gitopia/types

###############################################################################
###                           Tests & Simulation                            ###
###############################################################################

include sims.mk

PACKAGES_UNIT=$(shell go list ./... | grep -v -e '/tests/e2e')
PACKAGES_E2E=$(shell cd tests/e2e && go list ./... | grep '/e2e')
TEST_PACKAGES=./...
TEST_TARGETS := test-unit test-unit-cover test-race test-e2e

test-unit: ARGS=-timeout=5m -tags='norace'
test-unit: TEST_PACKAGES=$(PACKAGES_UNIT)
test-unit-cover: ARGS=-timeout=5m -tags='norace' -coverprofile=coverage.txt -covermode=atomic
test-unit-cover: TEST_PACKAGES=$(PACKAGES_UNIT)
test-race: ARGS=-timeout=5m -race
test-race: TEST_PACKAGES=$(PACKAGES_UNIT)
test-e2e: ARGS=-timeout=35m -v
test-e2e: TEST_PACKAGES=$(PACKAGES_E2E)
$(TEST_TARGETS): run-tests

run-tests:
ifneq (,$(shell which tparse 2>/dev/null))
	@echo "--> Running tests"
	@go test -mod=readonly -json $(ARGS) $(TEST_PACKAGES) | tparse
else
	@echo "--> Running tests"
	@go test -mod=readonly $(ARGS) $(TEST_PACKAGES)
endif

.PHONY: run-tests $(TEST_TARGETS)

docker-build-debug:
	@docker build -t gitopia/gitopiad-e2e -f Dockerfile .

docker-build-hermes:
	@cd tests/e2e/docker; docker build -t gitopia/hermes-e2e:1.0.0 -f hermes.Dockerfile .

docker-build-all: docker-build-debug docker-build-hermes
