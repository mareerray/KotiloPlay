| Room        | Season / atmosphere  | Scene details                                     |
| ----------- | -------------------- | ------------------------------------------------- |
| Bedroom     | Winter evening       | Snow outside, warm blankets, glowing bedside lamp |
| Living room | Autumn afternoon     | Amber leaves outside, cozy armchair, steaming tea |
| Office      | Rainy spring         | Raindrops on the window, desk lamp, little plants |
| Kitchen     | Summer morning       | Sunshine, flowers, curtains beside an open window |
| Bathroom    | Cozy Autumn | with golden trees and falling leaves outside              |
| Garden      | Spring in bloom      | Flowers, butterflies, drifting clouds             |
| Hallway      | Snowy Winter evening    | A frosted front door, warm wall lights, coats and scarves on hooks, and a bench for taking off winter boots             |


# PWA: Your setup checklist
- vite-plugin-pwa is installed. 

- vite.config.ts contains your VitePWA(...) configuration.

- The PNG files exist in public/ and match their declared dimensions.

- src/vite-env.d.ts contains both type references.

- PWAUpdatePrompt.tsx exists.

- App.tsx imports and renders <PWAUpdatePrompt /> once.

- The prompt’s CSS is included.

- index.html includes the Apple icon link.