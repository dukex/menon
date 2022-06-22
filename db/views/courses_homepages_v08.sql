 WITH base AS (
    SELECT id, slug, updated_at, featured, split_part(category, '/', 1) as category, name, thumbnail_url, description, creator_name, creator_url
    FROM courses
    WHERE status = 'reviewed' AND description IS NOT NULL AND description <> ''
 ) 
-- SELECT * FROM base

, latest AS (
    SELECT 'latest' as section, id, slug, featured, updated_at, category, name, thumbnail_url, description, creator_name, creator_url
    FROM base
    ORDER BY updated_at DESC
)
-- SELECT * FROM latest

, featured AS (
    SELECT 'featured' as section, id, slug, category, name, thumbnail_url, description, creator_name, creator_url
    FROM latest
    WHERE featured = TRUE
    ORDER BY updated_at DESC
)
-- SELECT * FROM featured

, top_categories AS (
    SELECT 'top_categories' as section, id, category, name, slug, thumbnail_url, description, creator_name, creator_url, rank() OVER (
          PARTITION BY category
          ORDER BY updated_at DESC
      )
    FROM latest
    WHERE category IN ('tech', 'music', 'design', 'business', 'sports')
)
-- SELECT * FROM top_categories

, top_categories_filtered AS (
    SELECT section, id, slug, category, name, thumbnail_url, description, creator_name, creator_url
    FROM top_categories
    WHERE rank <= 4
)
-- SELECT * FROM top_categories_filtered

, result AS (
    (SELECT section, id, name, category, thumbnail_url, description, slug, creator_name, creator_url FROM featured LIMIT 4)
    UNION
    (SELECT section, id, name, category, thumbnail_url, description, slug, creator_name, creator_url FROM latest LIMIT 4)
    UNION
    (SELECT section, id, name, category, thumbnail_url, description, slug, creator_name, creator_url FROM top_categories_filtered)
)

SELECT 
  result.section,
  result.id,
  result.name,
  result.category,
  result.thumbnail_url,
  result.description,
  result.slug,
  result.creator_name,
  result.creator_url,
  COUNT(lessons.id) as lessons_count
FROM result
LEFT JOIN courses_lessons lessons ON lessons.course_id = result.id
GROUP BY 1,2,3,4,5,6,7,8,9
ORDER BY section
