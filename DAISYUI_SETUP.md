# DaisyUI Setup for Discovery UI

## Overview
DaisyUI has been successfully configured for the Discovery UI project. This document provides information about the setup, available components, and usage guidelines.

## Installation Status
✅ DaisyUI v5.0.50 installed  
✅ Tailwind CSS v4 configuration updated  
✅ PostCSS configuration updated  
✅ Global CSS imports configured  
✅ Custom themes configured  

## Configuration Files

### 1. `tailwind.config.ts`
- Added DaisyUI plugin
- Configured custom themes (light/dark)
- Maintained existing design system variables
- Set up content paths for component scanning

### 2. `postcss.config.mjs`
- Updated to work with Tailwind CSS v4
- Configured for DaisyUI compatibility

### 3. `app/globals.css`
- Added `@import "daisyui"` import
- Maintained existing CSS custom properties
- Preserved design system compatibility

## Available DaisyUI Components

### Buttons
```tsx
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-accent">Accent</button>
<button className="btn btn-outline">Outline</button>
<button className="btn btn-ghost">Ghost</button>
```

### Cards
```tsx
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Title</h2>
    <p>Content</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Action</button>
    </div>
  </div>
</div>
```

### Alerts
```tsx
<div className="alert alert-info">
  <span>Info message</span>
</div>
<div className="alert alert-success">
  <span>Success message</span>
</div>
<div className="alert alert-warning">
  <span>Warning message</span>
</div>
<div className="alert alert-error">
  <span>Error message</span>
</div>
```

### Badges
```tsx
<div className="badge badge-primary">Primary</div>
<div className="badge badge-secondary">Secondary</div>
<div className="badge badge-accent">Accent</div>
<div className="badge badge-outline">Outline</div>
```

### Form Elements
```tsx
<input type="text" className="input input-bordered" />
<textarea className="textarea textarea-bordered"></textarea>
<select className="select select-bordered">
  <option>Option 1</option>
</select>
```

### Modals
```tsx
<dialog className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Modal Title</h3>
    <p className="py-4">Modal content</p>
    <div className="modal-action">
      <button className="btn">Close</button>
    </div>
  </div>
</dialog>
```

## Custom Themes

### Light Theme
- Primary: `#24859a` (Discovery UI brand color)
- Secondary: `#f5f5f5`
- Base: `#ffffff`
- Accent: `#f5f5f5`

### Dark Theme
- Primary: `#e5e5e5`
- Secondary: `#262626`
- Base: `#0a0a0a`
- Accent: `#404040`

## Integration with Existing Design System

The DaisyUI configuration maintains compatibility with your existing design system:

1. **CSS Custom Properties**: All existing CSS variables are preserved
2. **Color System**: DaisyUI themes are mapped to your existing color palette
3. **Typography**: Existing font configurations are maintained
4. **Spacing**: Tailwind spacing system remains unchanged

## Usage Guidelines

### 1. Component Selection
- Use DaisyUI components for common UI patterns (buttons, cards, alerts)
- Continue using custom components for specialized functionality
- Mix DaisyUI classes with existing Tailwind utilities

### 2. Theming
- DaisyUI automatically respects your dark/light theme toggle
- Use semantic color classes (`btn-primary`, `text-secondary`)
- Custom colors can still be used with existing CSS variables

### 3. Responsive Design
- DaisyUI components are responsive by default
- Use existing responsive utilities as needed
- Maintain mobile-first approach

## Testing

Visit `/daisyui-test` to see examples of DaisyUI components in action.

## Migration Strategy

### Phase 1: New Components
- Use DaisyUI for new components and features
- Maintain existing components as-is

### Phase 2: Gradual Migration
- Replace simple UI elements with DaisyUI equivalents
- Update buttons, cards, and form elements

### Phase 3: Full Integration
- Complete migration of all applicable components
- Establish consistent design patterns

## Best Practices

1. **Consistency**: Use DaisyUI components consistently across the application
2. **Accessibility**: DaisyUI components include accessibility features
3. **Customization**: Extend DaisyUI components with additional Tailwind classes
4. **Performance**: DaisyUI is tree-shakeable - only used components are included

## Troubleshooting

### Common Issues

1. **Styles not applying**: Ensure DaisyUI is imported in `globals.css`
2. **Theme not switching**: Check that the `data-theme` attribute is set correctly
3. **Conflicting styles**: DaisyUI styles have lower specificity than custom CSS

### Debug Commands
```bash
# Check DaisyUI installation
npm list daisyui

# Rebuild Tailwind CSS
npm run build

# Check for CSS conflicts
npm run lint
```

## Resources

- [DaisyUI Documentation](https://daisyui.com/)
- [DaisyUI Components](https://daisyui.com/components/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Theme Configuration](https://daisyui.com/theme-generator/)

## Next Steps

1. Review the test page at `/daisyui-test`
2. Start using DaisyUI components in new features
3. Plan migration of existing components
4. Update component library documentation
