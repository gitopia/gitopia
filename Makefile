PACKAGES=$(shell go list ./... | grep -v '/simulation')

# VERSION := $(shell echo $(shell git describe --tags) | sed 's/^v//')
COMMIT := $(shell git log -1 --format='%H')

# ldflags = -X github.com/cosmos/cosmos-sdk/version.Name=gitopia \
# 	-X github.com/cosmos/cosmos-sdk/version.ServerName=gitopiad \
# 	-X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
# 	-X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT) 

# BUILD_FLAGS := -ldflags '$(ldflags)'

all: install

.PHONY: build
build:
		@go build -o build/ ./cmd/gitopiad

install: go.sum
		@echo "--> Installing gitopiad"
		@go install -mod=readonly $(BUILD_FLAGS) ./cmd/gitopiad

go.sum: go.mod
		@echo "--> Ensure dependencies have not been modified"
		GO111MODULE=on go mod verify

test:
	@go test -mod=readonly $(PACKAGES)
