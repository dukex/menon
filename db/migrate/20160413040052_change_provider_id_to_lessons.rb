class ChangeProviderIdToLessons < ActiveRecord::Migration[4.2]
  def change
    change_column :lessons, :provider_id, :string
  end
end
