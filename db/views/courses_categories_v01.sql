SELECT 
  split_part(category, '/', 1) as category, 
  split_part(category, '/', 2) as sub_category, 
  COUNT(*) as courses 
FROM courses 
GROUP BY 1, 2
