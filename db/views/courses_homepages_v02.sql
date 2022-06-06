WITH base AS (
    SELECT *
    FROM courses
    WHERE status = 'reviewed'
), latest AS (
    SELECT 'latest' as section, *
    FROM base
    ORDER BY updated_at DESC
), featured AS (
    SELECT 'featured' as section, name, category
    FROM latest
    WHERE featured = TRUE
    ORDER BY updated_at DESC
), top_categories AS (
    SELECT 'top_categories' as section, name, category, rank() OVER (
          PARTITION BY category
          ORDER BY updated_at DESC
      )
    FROM latest
    WHERE category IN ('tech')
    ORDER BY updated_at DESC
), top_categories_filtered AS (
    SELECT *
    FROM top_categories
    WHERE rank <= 2
), result AS (
    (SELECT section, name, category FROM featured LIMIT 5)
    UNION 
    (SELECT section, name, category FROM latest LIMIT 5)
    UNION
    (SELECT section, name, category FROM top_categories_filtered LIMIT 4)
)

SELECT * FROM result
ORDER BY section
