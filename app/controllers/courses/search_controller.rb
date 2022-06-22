module Courses
  class SearchController < ApplicationController
    def index
      @courses = Courses::Search.by_tag(params[:tag])

      @facets = ActiveRecord::Base.connection.execute(
        Arel.sql("
          SELECT
            word AS tag,
            split_part(word, ':', 1) AS attr,
            split_part(word, ':', 2) AS value,
            ndoc AS count
          FROM ts_stat($$#{@courses.select('tags').to_sql}$$)
          WHERE
              word <> '#{params[:tag]}'
          ORDER BY ndoc DESC
        ")
      )
    end
  end
end
