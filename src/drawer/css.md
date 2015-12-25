#### Blocks

| Class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-drawer` | Defines the drawer container. | Required on root drawer element |

#### Elements

| Class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-drawer__navigation` | Defines the container for navigation links. | Required on either a `ul` or a generic element such as `nav` or `div`. |
| `mdl-drawer__navigation-item` | Defines a navigation item of the menu. | Required on either a `li` or `a` element. |
| `mdl-drawer__divider` | Defines a divider to break up navigation lists. | Optional. Required to be on a `span` element. |
| `mdl-drawer__content` | Defines a generic container for content. | Optional. |
| `mdl-drawer__backdrop` | Defines the backdrop element. | Required on a **direct sibling** element of the drawer. |

#### Modifiers

| Class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-drawer--fixed` | Modifies the drawer to always display on desktop systems. | Optional on root drawer element. |
| `mdl-drawer--visible` | Modifies the drawer to be visible if it is not fixed. | Toggled by JavaScript. |
| `mdl-drawer__navigation-item--active` | Modifies the navigation item's background and color to call it out from the others. | Required on active navigation elements. |

