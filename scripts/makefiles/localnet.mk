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
	@echo "  start                           Start localnet with storage & monitoring"
	@echo "  start-basic                     Start basic localnet only"
	@echo "  stop                            Stop localnet"
	@echo "  logs                            Show logs from all services"
	@echo "  logs-storage                    Show storage provider logs"
	@echo "  status                          Show service status"
	@echo "  monitoring                      Open monitoring dashboard"
	@echo "  setup-storage                   Setup storage directories"
localnet: localnet-help

localnet-init: localnet-clean localnet-build

localnet-build:
	@DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker compose -f tests/localnet/docker-compose.yml build

localnet-setup-storage:
	@echo "Setting up storage directories..."
	@mkdir -p tests/localnet/data/{gitopia,storage1,storage2}/{repos,attachments,lfs-objects}
	@docker network create storage-provider-test 2>/dev/null || echo "Network already exists"

localnet-start: localnet-setup-storage
	@echo "Starting Gitopia localnet with storage providers and monitoring..."
	@echo ""
	@echo "Services will be available at:"
	@echo "  - Gitopia Chain:        http://localhost:26657"
	@echo "  - Gitopia API:          http://localhost:1317"
	@echo "  - Storage Provider:     http://localhost:5002"
	@echo "  - IPFS Gateway:         http://localhost:8080"
	@echo "  - IPFS Cluster:         http://localhost:9094"
	@echo "  - Grafana Dashboard:    http://localhost:3000 (admin/admin123)"
	@echo "  - Prometheus:           http://localhost:9090"
	@echo ""
	docker compose -f tests/localnet/docker-compose.yml up

localnet-start-basic:
	@echo "Starting basic localnet (gitopiad + faucet only)..."
	docker compose -f tests/localnet/docker-compose.yml up gitopiad faucet

localnet-stop:
	docker compose -f tests/localnet/docker-compose.yml down

localnet-logs:
	docker compose -f tests/localnet/docker-compose.yml logs -f

localnet-logs-storage:
	docker compose -f tests/localnet/docker-compose.yml logs -f gitopia-storage

localnet-status:
	docker compose -f tests/localnet/docker-compose.yml ps

localnet-monitoring:
	@echo "Opening monitoring dashboards..."
	@echo "Grafana: http://localhost:3000 (admin/admin123)"
	@echo "Prometheus: http://localhost:9090"
	@which open >/dev/null && open http://localhost:3000 || echo "Open http://localhost:3000 in your browser"

localnet-clean:
	@echo "Cleaning up localnet environment..."
	@docker compose -f tests/localnet/docker-compose.yml down -v --remove-orphans 2>/dev/null || true
	@docker network rm storage-provider-test 2>/dev/null || true
	@rm -rf tests/localnet/data/
	@rm -rfI $(HOME)/.gitopia-local/
