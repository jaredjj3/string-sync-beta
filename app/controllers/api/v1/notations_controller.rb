class Api::V1::NotationsController < ApplicationController
  def index
    @notations = Notation.includes(:tags, :transcriber).all
    render(:index, status: 200)
  end

  def show
    @notation = Notation.find(params.require(:id))
    render(:show, status: 200)
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

    def notation_params
      params.
          require(:notation).
          permit(
            :id,
            :video_url,
            :thumbnail,
            :name,
            :artist_name,
            :build_structs,
            :scroll_structs
          )
    end
end
