# Gitopia Localnet with Storage Providers

This enhanced localnet setup includes Gitopia blockchain, storage providers, IPFS cluster, and comprehensive monitoring for testing storage challenges.

## 🏗️ Architecture

- **Gitopia Chain**: Local blockchain with pre-configured accounts
- **Storage Providers**: Two redundant providers with enhanced reliability
- **IPFS Infrastructure**: IPFS node + IPFS Cluster for distributed storage
- **Monitoring**: Prometheus + Grafana for metrics and alerting
- **Faucet**: Token distribution service

## 🚀 Quick Start

### From Gitopia Root Directory

```bash
# Start complete environment (recommended)
make localnet-start

# Or start basic localnet only (chain + faucet)
make localnet-start-basic

# Build images first if needed
make localnet-build
```

### Available Commands

```bash
make localnet-help           # Show all available commands
make localnet-build          # Build Docker images
make localnet-start          # Start full environment
make localnet-start-basic    # Start basic localnet only
make localnet-stop           # Stop all services
make localnet-clean          # Clean up everything
make localnet-logs           # Show all logs
make localnet-logs-storage   # Show storage provider logs
make localnet-status         # Show service status
make localnet-monitoring     # Open monitoring dashboard
```

## 📊 Service Endpoints

| Service | Endpoint | Description |
|---------|----------|-------------|
| Gitopia RPC | http://localhost:26657 | Tendermint RPC |
| Gitopia API | http://localhost:1317 | REST API |
| Gitopia gRPC | http://localhost:9090 | gRPC endpoint |
| Storage Provider | http://localhost:5002 | Storage provider |
| IPFS Gateway | http://localhost:8080 | IPFS HTTP gateway |
| IPFS API | http://localhost:5001 | IPFS API |
| IPFS Cluster API | http://localhost:9094 | Cluster management |
| Faucet | http://localhost:4500 | Token faucet |
| Grafana | http://localhost:3000 | Monitoring dashboard |
| Prometheus | http://localhost:9090 | Metrics collection |

## 🧪 Testing Storage Challenges

### Monitor Challenge Activity

```bash
# View storage provider logs
make localnet-logs-storage

# Check service status
make localnet-status

# Open monitoring dashboard
make localnet-monitoring
```

### Create Test Repository

```bash
# Connect to the chain container
docker exec -it gitopiad /bin/sh

# Create a test user and repository (this will trigger storage challenges)
gitopiad tx gitopia create-user testuser --from val --keyring-backend test --chain-id localgitopia --yes
gitopiad tx gitopia create-repository testrepo --from val --keyring-backend test --chain-id localgitopia --yes
```

## 📊 Monitoring

### Grafana Dashboard
- **URL**: http://localhost:3000
- **Credentials**: admin / admin123
- **Features**:
  - Localnet chain status
  - Storage provider health
  - Challenge response metrics
  - IPFS cluster status

### Prometheus Metrics
- **URL**: http://localhost:9090
- **Available Metrics**:
  - Chain consensus and block height
  - Storage challenge success/failure rates
  - WebSocket connection health
  - IPFS node metrics

## ⚙️ Configuration

### Storage Provider Configuration
- `config/storage-provider-1.toml`: First provider settings
- `config/storage-provider-2.toml`: Second provider settings

Key features:
- Enhanced WebSocket reliability (50 reconnect attempts vs 3)
- 8-second challenge response timeout (safely under 10s deadline)
- Redundant RPC endpoints for failover
- Comprehensive retry logic and error handling

### Environment Variables
- `.env`: Contains all configuration variables
- Modify `STORAGE_PROVIDER_*_MNEMONIC` to use different accounts
- Adjust monitoring ports if needed

### Monitoring Configuration
- `monitoring/prometheus.yml`: Metrics collection setup
- `monitoring/alert_rules.yml`: Alert rules for failures
- `monitoring/grafana/`: Dashboard and datasource configuration

## 🔧 Troubleshooting

### Common Issues

1. **Services not starting**
   ```bash
   # Check Docker and network
   docker network ls | grep storage-provider-test
   
   # Rebuild and restart
   make localnet-clean
   make localnet-build
   make localnet-start
   ```

2. **Storage challenges not working**
   ```bash
   # Check storage provider logs
   make localnet-logs-storage
   
   # Verify chain connectivity
   curl http://localhost:26657/status
   ```

3. **Port conflicts**
   ```bash
   # Check what's using the ports
   lsof -i :26657 -i :3000 -i :9090
   
   # Modify ports in .env file if needed
   ```

### Health Checks

```bash
# Chain health
curl http://localhost:26657/health

# Storage provider health  
curl http://localhost:5002/health
curl http://localhost:5003/health

# IPFS health
curl http://localhost:5001/api/v0/version

# Monitoring health
curl http://localhost:9090/-/healthy
curl http://localhost:3000/api/health
```

## 🔍 Development

### Adding Custom Storage Providers

1. Add new service to `docker-compose.yml`
2. Create configuration file in `config/`
3. Update monitoring configuration
4. Add to Makefile commands

### Customizing Chain Configuration

Modify `scripts/setup_chain.sh` to:
- Add more genesis accounts
- Change chain parameters
- Configure different validators

### Extending Monitoring

1. Add metrics to `monitoring/prometheus.yml`
2. Create custom Grafana dashboards
3. Add new alert rules

## 📚 Integration with E2E Tests

This localnet setup is compatible with the existing E2E test framework:

```bash
# Run E2E tests against localnet
make test-e2e

# Or run specific test suites
cd tests/e2e && go test -v ./...
```

The storage providers will automatically handle challenges generated during E2E test execution.

## 🎯 Next Steps

1. **Start the environment**: `make localnet-start`
2. **Open monitoring**: http://localhost:3000
3. **Create test repositories** to trigger storage challenges
4. **Monitor logs** for challenge activity
5. **Experiment** with different configurations

This setup provides a complete testing environment for Gitopia's storage challenge system with full observability and reliability features.
