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
    @notation = Notation.includes(:tags, :transcriber).find(params.require(:id))

    if authorized_to_update?(@notation)
      @notation.update!(notation_params)
      render(:show, status: 200)
    else
      errors = [{ type: :error, messages: ["not authorized to update"] }]
      render(json: errors, status: 422)
    end
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
            :dead_time,
            :duration,
            tags_attributes: [:id]
          )
    end

    def authorized_to_update?(notation)
      current_user.present? &&
          (notation.transcriber == current_user || current_user.has_role?(:admin))
    end
end
