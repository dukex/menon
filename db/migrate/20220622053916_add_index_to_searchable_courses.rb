class AddIndexToSearchableCourses < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    add_index :courses, :searchable, using: :gin, algorithm: :concurrently
  end
end
