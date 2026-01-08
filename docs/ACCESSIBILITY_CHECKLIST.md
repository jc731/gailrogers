# Accessibility Checklist for Content Authors

This checklist helps content authors ensure their markdown content meets WCAG 2.2 AA accessibility standards.

## ✅ Content Guidelines

### Headings
- [ ] **One H1 per page** - Each page should have exactly one main heading (H1)
- [ ] **Logical heading order** - Headings should follow order: H1 → H2 → H3 (don't skip levels)
- [ ] **Descriptive headings** - Headings should clearly describe the content that follows
- [ ] **No empty headings** - All headings must have text content

### Images
- [ ] **Alt text for all images** - Every image must have descriptive alt text
- [ ] **Decorative images** - If an image is purely decorative, use empty alt text (`alt=""`)
- [ ] **Descriptive alt text** - Alt text should describe the image's content and purpose, not just say "image"
- [ ] **No text in images** - Avoid images that contain important text (use actual text instead)

### Links
- [ ] **Descriptive link text** - Link text should clearly indicate where the link goes
- [ ] **Avoid "click here"** - Use descriptive text like "Read more about family law" instead of "click here"
- [ ] **External links** - Consider indicating external links (though this may be handled by templates)

### Forms
- [ ] **Clear labels** - All form fields must have clear, descriptive labels
- [ ] **Required fields** - Clearly mark required fields (templates handle this automatically)
- [ ] **Error messages** - Provide clear, helpful error messages if form validation fails

### Color and Contrast
- [ ] **Don't rely on color alone** - Don't use color as the only way to convey information
- [ ] **Sufficient contrast** - Text should have sufficient contrast with background (templates handle this)
- [ ] **Focus indicators** - Interactive elements have visible focus states (handled by templates)

### Content Structure
- [ ] **Lists for lists** - Use proper list markup (bulleted or numbered) for lists
- [ ] **Tables for data** - Use tables for tabular data, not for layout
- [ ] **Paragraphs for text** - Use paragraph tags for text blocks

## ✅ Markdown Best Practices

### Section Content (`richText` sections)
```markdown
---
sections:
  - type: richText
    content: |
      <h2>Main Section Heading</h2>
      <p>Paragraph text here.</p>
      <h3>Subsection Heading</h3>
      <p>More content.</p>
```

**Guidelines:**
- Use `<h2>` for main section headings (after the page H1)
- Use `<h3>` for subsections
- Use `<p>` for paragraphs
- Use proper HTML tags, not markdown shortcuts in richText sections

### Images in Content
```markdown
![Descriptive alt text explaining what the image shows](/path/to/image.jpg)
```

**Guidelines:**
- Always include alt text
- Make alt text descriptive and contextual
- For decorative images, use empty alt: `![](/path/to/image.jpg)`

### Links
```markdown
[Descriptive link text that explains the destination](/path/to/page)
```

**Guidelines:**
- Use descriptive link text
- Avoid generic text like "click here" or "read more"
- Good: "Learn more about our family law services"
- Bad: "Click here"

## ✅ Testing Your Content

### Before Publishing
1. **Review heading structure** - Check that headings follow logical order
2. **Test with keyboard** - Navigate your page using only the keyboard (Tab, Enter, Arrow keys)
3. **Check images** - Ensure all images have appropriate alt text
4. **Review link text** - Ensure all links have descriptive text
5. **Check form labels** - Verify all form fields have clear labels

### Browser Testing
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test with browser zoom at 200% - content should remain usable
- Test on mobile devices - ensure touch targets are large enough

### Screen Reader Testing (Optional but Recommended)
- Use a screen reader (NVDA, JAWS, VoiceOver) to test your content
- Ensure all content is announced correctly
- Verify heading navigation works properly

## ✅ Common Mistakes to Avoid

1. **Skipping heading levels** - Don't go from H1 to H3, always use H2 first
2. **Multiple H1 tags** - Only one H1 per page
3. **Empty alt text on informative images** - Always describe what the image shows
4. **Generic link text** - "Click here" doesn't help screen reader users
5. **Using images for text** - Use actual text, not images of text
6. **Poor color contrast** - Templates handle this, but be aware
7. **Missing form labels** - All form fields need labels (templates handle this)

## ✅ Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/) - Accessibility testing tool
- [axe DevTools](https://www.deque.com/axe/devtools/) - Accessibility testing browser extension

## ✅ Questions?

If you're unsure about accessibility requirements:
1. Check this checklist first
2. Review the [Accessibility Audit Report](./ACCESSIBILITY_AUDIT.md)
3. Test with keyboard navigation
4. When in doubt, make content more descriptive and explicit



