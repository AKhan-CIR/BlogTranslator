class RemoveTranslatedFromPosts < ActiveRecord::Migration[6.0]
  def change

    remove_column :posts, :translated, :text
  end
end
