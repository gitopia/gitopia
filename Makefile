#!/usr/bin/make -f

PACKAGES=$(shell go list ./... | grep -v '/simulation')
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
COMMIT := $(shell git log -1 --format='%H')

TM_VERSION := $(shell go list -m github.com/tendermint/tendermint | sed 's:.* ::') # grab everything after the space in "github.com/tendermint/tendermint v0.34.10"

# don't override user values
ifeq (,$(VERSION))
  VERSION := $(shell echo $(shell git describe --tags) | sed 's/^v//')
  # if VERSION is empty, then populate it with branch's name and raw commit hash
  ifeq (,$(VERSION))
    VERSION := $(BRANCH)-$(COMMIT)
  endif
endif

ldflags = -X github.com/cosmos/cosmos-sdk/version.Name=gitopia \
	-X github.com/cosmos/cosmos-sdk/version.AppName=gitopiad \
	-X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
	-X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT) \
	-X "github.com/cosmos/cosmos-sdk/version.BuildTags=$(build_tags_comma_sep)" \
	-X github.com/tendermint/tendermint/version.TMCoreSemVer=$(TM_VERSION)

BUILD_FLAGS := -ldflags '$(ldflags)'

all: install

.PHONY: build
build:
		@go build -mod=readonly $(BUILD_FLAGS) -o build/ ./cmd/gitopiad

install: go.sum
		@echo "--> Installing gitopiad"
		@go install -mod=readonly $(BUILD_FLAGS) ./cmd/gitopiad

go.sum: go.mod
		@echo "--> Ensure dependencies have not been modified"
		GO111MODULE=on go mod verify

test:
	@go test -mod=readonly $(PACKAGES)
