#!/usr/bin/make -f

APPNAME := gitopiad
PACKAGES=$(shell go list ./... | grep -v '/simulation')
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
COMMIT := $(shell git log -1 --format='%H')

LEDGER_ENABLED ?= true
TM_VERSION := $(shell go list -m github.com/tendermint/tendermint | sed 's:.* ::') # grab everything after the space in "github.com/tendermint/tendermint v0.34.10"
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
	-X github.com/tendermint/tendermint/version.TMCoreSemVer=$(TM_VERSION)

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
tar = cd build && tar -cvzf $(APPNAME)_$(version)_$(1)_$(2).tar.gz $(APPNAME)$(3) && \
    rm $(BUILDDIR)/$(APPNAME)$(3)
zip = cd build && zip $(APPNAME)_$(version)_$(1)_$(2).zip $(APPNAME)$(3) && \
    rm $(BUILDDIR)/$(APPNAME)$(3)

.PHONY: build

BUILD_TARGETS := build install

build: BUILD_ARGS=-o $(BUILDDIR)/

$(BUILD_TARGETS): go.sum $(BUILDDIR)/
	go $@ -mod=readonly $(BUILD_FLAGS) $(BUILD_ARGS) ./...

$(BUILDDIR)/:
	mkdir -p $(BUILDDIR)/

all: windows darwin linux

##### LINUX BUILDS #####
linux: build/$(APPNAME)_$(VERSION)_linux_arm.tar.gz build/$(APPNAME)_$(VERSION)_linux_arm64.tar.gz build/$(APPNAME)_$(VERSION)_linux_386.tar.gz build/$(APPNAME)_$(VERSION)_linux_amd64.tar.gz

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
darwin: build/$(APPNAME)_$(VERSION)_darwin_amd64.tar.gz build/$(APPNAME)_$(VERSION)_darwin_arm64.tar.gz

build/$(APPNAME)_$(VERSION)_darwin_arm64.tar.gz:
	$(call build,darwin,arm64,)
	$(call tar,darwin,arm64)

build/$(APPNAME)_$(VERSION)_darwin_amd64.tar.gz:
	$(call build,darwin,amd64,)
	$(call tar,darwin,amd64)

##### WINDOWS BUILDS #####
windows: build/$(APPNAME)_$(VERSION)_windows_386.zip build/$(APPNAME)_$(VERSION)_windows_amd64.zip

build/$(APPNAME)_$(VERSION)_windows_386.zip:
	$(call build,windows,386,.exe)
	$(call zip,windows,386,.exe)

build/$(APPNAME)_$(VERSION)_windows_amd64.zip:
	$(call build,windows,amd64,.exe)
	$(call zip,windows,amd64,.exe)

go.sum: go.mod
		@echo "--> Ensure dependencies have not been modified"
		GO111MODULE=on go mod verify

clean:
	rm -rf $(BUILDDIR)/

test:
	@go test -mod=readonly $(PACKAGES)
