###############################################################################
###                                Localnet                                 ###
###############################################################################

localnet-help:
	@echo "localnet subcommands"
	@echo ""
	@echo "Usage:"
	@echo "  make localnet-[command]"
	@echo ""
	@echo "Available Commands:"
	@echo "  build                           Build localnet"
	@echo "  clean                           Clean localnet"
	@echo "  init                            Initialize localnet"
	@echo "  start                           Start localnet"
	@echo "  stop                            Stop localnet"
localnet: localnet-help

localnet-init: localnet-clean localnet-build

localnet-build:
	@DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker compose -f tests/localnet/docker-compose.yml build

localnet-start:
	docker compose -f tests/localnet/docker-compose.yml up

localnet-stop:
	docker compose -f tests/localnet/docker-compose.yml down

localnet-clean:
	@rm -rfI $(HOME)/.gitopia-local/
