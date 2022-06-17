 WITH base AS (
    SELECT slug, updated_at, featured, category, name, thumbnail_url, description, creator_name, creator_url
    FROM courses
    WHERE status = 'reviewed'
 )
-- SELECT * FROM base

, latest AS (
    SELECT 'latest' as section, slug, featured, updated_at, category, name, thumbnail_url, description, creator_name, creator_url
    FROM base
    ORDER BY updated_at DESC
)
-- SELECT * FROM latest

, featured AS (
    SELECT 'featured' as section, slug, category, name, thumbnail_url, description, creator_name, creator_url
    FROM latest
    WHERE featured = TRUE
    ORDER BY updated_at DESC
)
-- SELECT * FROM featured

, top_categories AS (
    SELECT 'top_categories' as section, category, name, slug, thumbnail_url, description, creator_name, creator_url, rank() OVER (
          PARTITION BY category
          ORDER BY updated_at DESC
      )
    FROM latest
    WHERE category IN ('tech')
    ORDER BY updated_at DESC
)
-- SELECT * FROM top_categories

, top_categories_filtered AS (
    SELECT section, slug, category, name, thumbnail_url, description, creator_name, creator_url
    FROM top_categories
    WHERE rank <= 2
)
-- SELECT * FROM top_categories_filtered

, result AS (
    (SELECT section, name, category, thumbnail_url, description, slug, creator_name, creator_url FROM featured LIMIT 4)
    UNION
    (SELECT section, name, category, thumbnail_url, description, slug, creator_name, creator_url FROM latest LIMIT 4)
    UNION
    (SELECT section, name, category, thumbnail_url, description, slug, creator_name, creator_url FROM top_categories_filtered LIMIT 2)
)

SELECT * FROM result
ORDER BY section
