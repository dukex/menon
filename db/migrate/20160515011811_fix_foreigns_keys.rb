class FixForeignsKeys < ActiveRecord::Migration
  def change
    uuid :courses, :owner_id
    uuid :friendly_id_slugs, :sluggable_id
    uuid :lesson_statuses, :lesson_id
    uuid :lesson_statuses, :user_id
    uuid :lessons, :course_id
  end

  private

  def uuid(table, colum)
    execute "ALTER TABLE #{table} DROP #{colum} CASCADE"
    add_column table, "#{colum}_temp", :uuid
    change_table table do |t|
      t.rename "#{colum}_temp", colum
    end
  end
end
