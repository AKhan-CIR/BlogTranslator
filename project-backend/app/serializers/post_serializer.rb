class PostSerializer < ActiveModel::Serializer
  attributes :id, :original
  has_one :user
end
