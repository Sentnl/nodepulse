import {NodePulse} from "../lib/index.js";

// Initialize NodePulse with LightAPI configuration
const nodePulse = new NodePulse({
    nodeType: 'lightapi',
    network: 'mainnet',
    nodeCount: 3,
    updateInterval: 30000, // 30 seconds
    onNodeUpdate: (nodes) => {
        console.log('Available LightAPI nodes:', nodes);
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
        console.log('\nUsing LightAPI node:', node);

        // Check LightAPI status
        const response = await fetch(`${node}/api/status`);
        const status = await response.text();
        console.log('LightAPI Status:', status);
    } catch (error) {
        console.error('Failed to check LightAPI status:', error.message);
    }
}

example();

// Then call example() every 10 seconds
setInterval(example, 10000); 