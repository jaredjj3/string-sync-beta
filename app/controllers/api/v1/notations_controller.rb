class Api::V1::NotationsController < ApplicationController
  def index
    @notations = Notation.includes(:tags, :transcriber).all
    render(:index, status: 200)
  end

  def show
    @notation = Notation.includes(:tags, :transcriber).find(params.require(:id))
    render(:show, status: 200)
  end

  def create
    # TODO: Fill this.
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
            :vextab,
            :tempo,
            :dead_time
          )
    end
end
