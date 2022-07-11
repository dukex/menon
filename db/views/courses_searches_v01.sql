WITH result AS (
  SELECT
  id, name, category, thumbnail_url, description, slug, creator_name, creator_url,
array_to_tsvector(
  array_remove(
    ARRAY[
    'category:' || split_part(category, '/', 1) || '',
    'subcategory:' || split_part(category, '/', 2) || '',
    'language:' ||language || ''
    'creator:' || creator_name
    ],
    NULL
  )
) tags
FROM courses
WHERE status = 'reviewed' AND description IS NOT NULL AND description <> ''
)

SELECT
  result.id,
  result.name,
  result.category,
  result.thumbnail_url,
  result.description,
  result.slug,
  result.creator_name,
  result.creator_url,
  result.tags,
  COUNT(lessons.id) as lessons_count,
  SUM(lessons.duration)/3600  as hours
FROM result
LEFT JOIN courses_lessons lessons ON lessons.course_id = result.id
GROUP BY 1,2,3,4,5,6,7,8,9
