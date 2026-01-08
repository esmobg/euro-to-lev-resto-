// Responsive Design Test Script
// Run with: node test-responsive.js

const { chromium } = require('playwright');
const devices = require('playwright').devices;

const devicesToTest = [
    { name: 'iPhone 12', device: devices['iPhone 12'] },
    { name: 'iPhone 13 Pro', device: devices['iPhone 13 Pro'] },
    { name: 'Samsung Galaxy S21', device: devices['Galaxy S21'] },
    { name: 'Pixel 5', device: devices['Pixel 5'] },
    { name: 'iPad Pro', device: devices['iPad Pro'] },
    { name: 'iPad Air', device: devices['iPad Air'] },
    { name: 'Galaxy Tab S4', device: devices['Galaxy Tab S4'] },
];

async function testDevice(deviceName, deviceConfig) {
    console.log(`\n🧪 Testing ${deviceName}...`);
    
    const browser = await chromium.launch();
    const context = await browser.newContext({
        ...deviceConfig,
        viewport: deviceConfig.viewport,
    });
    
    const page = await context.newPage();
    
    try {
        await page.goto('http://localhost:9000/index.html', { waitUntil: 'networkidle' });
        
        // Wait for page to fully load
        await page.waitForTimeout(1000);
        
        // Take screenshot
        const screenshotPath = `screenshots/${deviceName.replace(/\s+/g, '-')}.png`;
        await page.screenshot({ 
            path: screenshotPath, 
            fullPage: true 
        });
        
        console.log(`✅ Screenshot saved: ${screenshotPath}`);
        
        // Test some interactions
        const title = await page.textContent('h1');
        console.log(`   Title: ${title}`);
        
        // Check if form is visible
        const formVisible = await page.isVisible('#calculator-form');
        console.log(`   Form visible: ${formVisible}`);
        
        // Check viewport dimensions
        const viewport = page.viewportSize();
        console.log(`   Viewport: ${viewport.width}x${viewport.height}`);
        
        // Test input fields
        const amountPaidVisible = await page.isVisible('#amount-paid');
        const itemCostVisible = await page.isVisible('#item-cost');
        console.log(`   Input fields visible: ${amountPaidVisible && itemCostVisible}`);
        
        // Test currency selection
        const currencySelectionVisible = await page.isVisible('.currency-selection');
        console.log(`   Currency selection visible: ${currencySelectionVisible}`);
        
        // Test accessibility controls
        const accessibilityControlsVisible = await page.isVisible('.accessibility-controls');
        console.log(`   Accessibility controls visible: ${accessibilityControlsVisible}`);
        
        // Check if layout is responsive (elements stack on mobile)
        const inputRow = await page.locator('.input-row');
        const inputRowDisplay = await inputRow.evaluate(el => {
            return window.getComputedStyle(el).display;
        });
        console.log(`   Input row display: ${inputRowDisplay}`);
        
        // Check radio group layout
        const radioGroup = await page.locator('.radio-group');
        const radioGroupFlexDirection = await radioGroup.evaluate(el => {
            return window.getComputedStyle(el).flexDirection;
        });
        console.log(`   Radio group flex-direction: ${radioGroupFlexDirection}`);
        
    } catch (error) {
        console.error(`❌ Error testing ${deviceName}:`, error.message);
    } finally {
        await browser.close();
    }
}

async function runAllTests() {
    console.log('🚀 Starting Responsive Design Tests\n');
    console.log('='.repeat(50));
    
    // Create screenshots directory
    const fs = require('fs');
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
    }
    
    for (const { name, device } of devicesToTest) {
        await testDevice(name, device);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ All tests completed!');
    console.log('📸 Screenshots saved in ./screenshots/ directory');
}

// Run tests
runAllTests().catch(console.error);

