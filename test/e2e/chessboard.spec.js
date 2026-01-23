import { test, expect } from '@playwright/test'

test.describe('ChessBoard component', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('affiche un plateau de 64 cases', async ({ page }) => {
    const squares = page.locator('.square')
    await expect(squares).toHaveCount(64)
  })

  test('affiche des pièces sur le plateau', async ({ page }) => {
    await expect(page.locator('.piece', { hasText: '♜' })).toBeVisible()
    await expect(page.locator('.piece', { hasText: '♔' })).toBeVisible()
  })

  test('permet de déplacer une pièce librement', async ({ page }) => {
    const from = page.locator('.square').nth(52) // pion blanc
    const to = page.locator('.square').nth(36)

    await from.click()
    await to.click()

    await expect(to.locator('.piece')).toHaveText('♙')
    await expect(from.locator('.piece')).toHaveText('')
  })

  test('enregistre le déplacement dans l’historique', async ({ page }) => {
    const from = page.locator('.square').nth(52)
    const to = page.locator('.square').nth(36)

    await from.click()
    await to.click()

    const historyItems = page.locator('.history li')
    await expect(historyItems).toHaveCount(1)
    await expect(historyItems.first()).toContainText('♙')
  })

})
