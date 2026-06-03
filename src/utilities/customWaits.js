/**
 * Smart wait utilities — Wrapper pattern.
 * Mirrors the production smartWaitUiUtility style:
 * minimal, defensive, well-logged.
 */

async function smartWaitForElement(locator, options = {}) {
    const { timeout = 10000, description = 'element' } = options;
    const maxRetries = 2;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`[smartWait] Attempt ${attempt}/${maxRetries} — waiting for ${description} to be visible (timeout: ${timeout}ms)`);
            await locator.waitFor({ state: 'visible', timeout });
            console.log(`[smartWait] ✓ ${description} is visible`);
            return;
        } catch (error) {
            console.log(`[smartWait] ✗ Attempt ${attempt} failed for ${description}: ${error.message}`);
            if (attempt === maxRetries) {
                throw new Error(`[smartWait] ${description} was not visible after ${maxRetries} attempts (timeout: ${timeout}ms each)`);
            }
        }
    }
}

module.exports = { smartWaitForElement };
