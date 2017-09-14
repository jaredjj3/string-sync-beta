class Api::V1::TagsController < ApplicationController
  def index
    @tags = Tag.all
  end
end