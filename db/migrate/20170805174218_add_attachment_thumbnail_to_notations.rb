class AddAttachmentThumbnailToNotations < ActiveRecord::Migration[5.0]
  def up
    change_table :notations do |t|
      t.attachment :thumbnail
    end
  end

  def down
    remove_attachment :notations, :thumbnail
  end
end
