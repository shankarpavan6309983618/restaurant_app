// import React from 'react'

export default function Tabs({categories, active, onChange}) {
  return (
    <nav className="tabs" aria-label="menu-categories">
      {categories.map(cat => (
        <button
          type="button"
          key={cat.menu_category_id || cat.menu_category}
          onClick={() => onChange(cat.menu_category)}
          className={cat.menu_category === active ? 'tab active' : 'tab'}
          data-testid={`tab-${cat.menu_category}`}
        >
          {cat.menu_category}
        </button>
      ))}
    </nav>
  )
}
