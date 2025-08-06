application info
    a web app to Access scholarly resources from library catalog, institutional repositories, subscription databases, and open-access archives in one place.

Pages
    Landing Page (/)
        * a hero section with Title and subtitle
        * search component

    search page (/search)
        * search component (`components/Search.tsx`)
        * a list of loading indicators (`components/LoadingSkeletonItem.tsx`)
        * a list of search result item components (`components/SearchResultItem.tsx`) below search component 
        * a filter component (`components/Filter.tsx`) on the left

    detail page (/detail/${resource_id})
        * a page to show searched item detail

components
    Search Component (`components/Search.tsx`)
        * shadcn input component with Live type-ahead with throttling/debounce and highlighting of matched substrings.
        * “Did you mean…” spelling-correction suggestions.
        * Empty-state messaging when no results are found.
        * Keyboard navigation (↑/↓ arrow, Enter to select).

    Search Result Item Component (`components/SearchResultItem.tsx`)
        * a card that contains informations like title, author, publication date, source, description
        * pagination ,export, sort, result count information
        * search string matching texts are highligted

    Loading Skeleton Component (`components/LoadingSkeletonItem.tsx`)
        * a skeleton component matching `components/SearchResultItem.tsx
    
    Filter Component (`components/Filter.tsx`)
        * list of facets grouped by their title
        * Ability to combine multiple facets (AND/OR logic).
        * “Show more” / “Show less” on long filter lists.
        * Persisted filter state in URL (for deep-linking & browser back/forward).

    Search Result Detail Component (`components/SearchResultDetail.tsx`)
        * Tabbed sections: metadata, linked resources, citations.
        * Contextual breadcrumbs back to search or facet view.

layout
    footer (`layout/footer/index.tsx`)
        contains app name , copy right and year
    
    topnav (`layout/topnav/index.tsx`)
        app logo on left and language switcher on the right
