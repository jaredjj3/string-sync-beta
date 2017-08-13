class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def errors_as_json
    [{ type: :error, messages: errors.full_messages }]
  end
end
