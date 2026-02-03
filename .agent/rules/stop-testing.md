---
trigger: always_on
---

DISALLOWED:
- Opening a web browser (Chrome, Firefox, Edge, WebView, headless or non-headless)
- Visiting URLs for UI verification
- Clicking, scrolling, typing, or inspecting DOM elements
- Visual or screenshot-based UI validation

ALLOWED:
- Unit tests
- API tests (REST, GraphQL)
- Mocked UI tests (without rendering)
- Static code analysis
- Linting
- Logic and flow validation


