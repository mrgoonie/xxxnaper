#!/usr/bin/env node
/**
 * Monitor console messages
 * Usage: node console.js --url https://example.com [--types error,warn] [--duration 5000]
 */
import { getBrowser, getPage, closeBrowser, parseArgs, outputJSON, outputError } from './lib/browser.js';

async function monitorConsole() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.url) {
    outputError(new Error('--url is required'));
    return;
  }

  try {
    const browser = await getBrowser({
      headless: args.headless !== 'false'
    });

    const page = await getPage(browser);

    const messages = [];
    const filterTypes = args.types ? args.types.split(',') : null;

    // Listen for console messages
    page.on('console', (msg) => {
      const type = msg.type();

      if (!filterTypes || filterTypes.includes(type)) {
        messages.push({
          type: type,
          text: msg.text(),
          location: msg.location(),
          timestamp: Date.now()
        });
      }
    });

    // Listen for page errors
    page.on('pageerror', (error) => {
      messages.push({
        type: 'pageerror',
        text: error.message,
        stack: error.stack,
        timestamp: Date.now()
      });
    });

    // Navigate
    await page.goto(args.url, {
      waitUntil: args['wait-until'] || 'networkidle2'
    });

    // Wait for additional time if specified
    if (args.duration) {
      await new Promise(resolve => setTimeout(resolve, parseInt(args.duration)));
    }

    outputJSON({
      success: true,
      url: page.url(),
      messageCount: messages.length,
      messages: messages
    });

    if (args.close !== 'false') {
      await closeBrowser();
    }
  } catch (error) {
    outputError(error);
  }
}

monitorConsole();
