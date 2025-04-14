# LooseLips - Secure AI Memory Application

LooseLips is a secure AI memory application for storing secret memories that only the user and their authorized agents can access. It provides end-to-end encryption, decentralized storage, and granular access control for your sensitive data.

![LooseLips Dashboard](./public/images/dashboard-screenshot.png)

## Features

- **End-to-End Encryption**: All data is encrypted locally before leaving your device
- **Decentralized Storage**: Multiple storage options for permanent, censorship-resistant data
- **Access Control**: Fine-grained permissions for AI agents and human users
- **Wallet Integration**: Connect with MetaMask or WalletConnect
- **Memory Management**: Organize, search, and manage your encrypted memories
- **Agent Creation**: Create and configure AI agents with specific access levels

## Encryption Flow

LooseLips implements a robust encryption flow to ensure your data remains secure:

1. **Local Encryption**:
   - Data is encrypted on your device using AES-256 encryption
   - Encryption happens in your browser before data leaves your device
   - Each memory has a unique encryption key

2. **Key Management with Lit Protocol**:
   - [Lit Protocol](https://litprotocol.com/) manages encryption keys with condition-based access control
   - Access conditions are stored on-chain and can specify:
     - The user's wallet can access the data
     - Specific AI agent's contract addresses can access the data
     - Optional additional agents that can access the data

3. **Decentralized Storage**:
   - Encrypted data is stored on your choice of decentralized storage networks
   - Only encrypted data is ever stored, ensuring privacy even if the storage layer is compromised

4. **Access and Decryption**:
   - When accessing memories, Lit Protocol verifies access conditions
   - If conditions are met, decryption keys are provided
   - Data is decrypted locally in your browser

## Storage Options

LooseLips supports multiple decentralized storage options:

### IPFS/Filecoin

The InterPlanetary File System (IPFS) and Filecoin network provide content-addressed, permanent storage for your encrypted memories.

**Key Features**:
- Content-addressed storage ensures data integrity
- Permanent storage with Filecoin incentives
- Fully decentralized with no central point of failure
- Robust ecosystem and tooling

### Recall Network

Recall Network is the first unstoppable intelligence network empowering agents to store, share, and trade knowledge on-chain.

**Key Features**:
- Agent-centric design optimized for AI memory
- Knowledge trading capabilities
- On-chain storage with blockchain security
- Designed specifically for AI agent interactions

### Storacha AI

Storacha AI provides self-sovereign data solutions for multi-agent deployments with enhanced privacy features.

**Key Features**:
- Multi-agent optimized architecture
- Self-sovereign data control
- Privacy-focused design
- Specialized for AI memory management

## Agent Management

LooseLips allows you to create and manage AI agents with different access levels:

1. **Full Access**:
   - Agent can read, write, and modify all memories without restrictions
   - Highest level of access, typically reserved for the owner

2. **Limited Access**:
   - Agent can read all memories but only modify specific categories
   - Suitable for specialized AI assistants with specific responsibilities

3. **Read-Only**:
   - Agent can only read memories but cannot create or modify them
   - Ideal for analysis agents or when sharing memories with limited trust

Each agent can be configured with:
- Custom name and description
- AI model selection (GPT-4o, Claude 3, etc.)
- Storage provider preference
- Encryption settings
- Access control conditions

## Security Considerations

- **Wallet Security**: Your wallet is your primary authentication method. Keep your wallet secure.
- **Recovery Phrase**: Store your recovery phrase in a secure location.
- **Access Control**: Regularly audit agent access permissions.
- **Encryption**: All data is encrypted by default. Never disable encryption for sensitive information.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Configure your environment variables
4. Run the development server with `npm run dev`
5. Connect your wallet and start creating secure memories

## Environment Variables

```
NEXT_PUBLIC_LIT_PROTOCOL_KEY=your_lit_protocol_key
NEXT_PUBLIC_IPFS_GATEWAY=your_ipfs_gateway
RECALL_NETWORK_API_KEY=your_recall_network_key
STORACHA_AI_API_KEY=your_storacha_ai_key
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```

I've enhanced the LooseLips application with the following new features:

1. **Additional Storage Options**
   - Added Recall Network and Storacha AI as decentralized storage options
   - Created UI components to select and manage storage providers
   - Added storage provider selection during agent creation

2. **Agent Management**
   - Created a new Agents page for managing AI agents
   - Implemented a multi-step agent creation dialog
   - Added detailed agent information display
   - Integrated storage provider selection in the agent creation flow

3. **Enhanced Settings**
   - Updated the Storage Settings tab to include all three storage providers
   - Added detailed information about each storage option
   - Implemented UI for selecting default storage provider

4. **Updated Navigation**
   - Added an Agents link in the sidebar for quick access to agent management

5. **Comprehensive README**
   - Created a detailed README.md explaining the encryption flow
   - Documented all three storage options and their features
   - Provided information on agent access levels and security considerations

The application now allows users to:
1. Create and manage AI agents with different access levels
2. Select their preferred storage option (IPFS/Filecoin, Recall Network, or Storacha AI)
3. Configure detailed settings for each storage provider
4. View comprehensive information about each agent and its storage configuration

This implementation provides a secure, flexible system for managing AI memories with multiple decentralized storage options and granular access control.
```

