import {NodePulse} from "../lib/index.js";

// Initialize NodePulse with IPFS configuration
const nodePulse = new NodePulse({
    nodeType: 'ipfs',
    network: 'mainnet',
    nodeCount: 3,
    updateInterval: 30000, // 30 seconds
    onNodeUpdate: (nodes) => {
        console.log('Available IPFS nodes:', nodes);
    },
    onError: (error) => {
        console.error('Error occurred:', error.message);
    },
    onFallback: (type, nodes) => {
        console.warn(`Fallback to ${type} nodes:`, nodes);
    }
});

async function example() {
    try {
        const node = await nodePulse.getNode();
        console.log('\nUsing IPFS node:', node);

        // Example: Check if IPFS file exists and get first byte
        const ipfsHash = 'QmWnfdZkwWJxabDUbimrtaweYF8u9TaESDBM8xvRxxbQxv';
        const response = await fetch(`${node}/ipfs/${ipfsHash}`, {
            headers: {
                'Range': 'bytes=0-0' // Request only first byte
            }
        });
        
        if (response.ok) {
            const byte = await response.text();
            console.log('IPFS file exists, first byte:', byte);
            console.log('Content-Length:', response.headers.get('content-length'));
            console.log('Content-Type:', response.headers.get('content-type'));
        } else {
            console.log('IPFS file not found or gateway error');
        }
    } catch (error) {
        console.error('Failed to check IPFS file:', error.message);
    }
}

example();

// Then call example() every 10 seconds
setInterval(example, 10000); 