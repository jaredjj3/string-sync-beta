class Api::V1::NotationsController < ApplicationController
  def index
    # TODO: Implement checking fetched_at and only return notations fetched after fetched_at
    @notations = Notation.includes(:tags, :transcriber).where(featured: true)
    render(:index, status: 200)
  end

  def show
    @notation = Notation.includes(:tags, :transcriber).find(params.require(:id))
    render(:show, status: 200)
  end

  def create
    if authorized_to_create?
      if @notation = Notation.create(notation_params.merge(transcriber: current_user))
        render(:show, status: 200)
      else
        render_errors(@notation.errors.full_messages, status: 400)
      end
    else
      render_errors("not authorized to create", status: 422)
    end
  end

  def update
    @notation = Notation.includes(:tags, :transcriber).find(params.require(:id))

    if authorized_to_update?(@notation)
      if @notation.update(notation_params)
        render(:show, status: 200)
      else
        render_errors(@notation.errors.full_messages, status: 400)
      end
    else
      render_errors("not authorized to update", status: 422)
    end
  end

  def destroy
    @notation = Notation.includes(:tags, :transcriber).find(params.require(:id))

    if authorized_to_destroy?(@notation)
      @notation.update!(notation_params)
      render(:show, status: 200)
    else
      render_errors("not authorized to destroy", status: 422)
    end
  end

  private

    def authorized_to_create?
      logged_in? && (current_user.has_role?(:teacher) || current_user.has_role?(:admin))
    end

    def authorized_to_update?(notation)
      logged_in? && (current_user == notation.transcriber || current_user.try(:has_role?, :admin))
    end

    def authorized_to_destroy?(notation)
      current_user.try(:has_role?, :admin)
    end

    def notation_params
      params_base = params.
          require(:notation).
          permit(*%i(
            youtube_video_id
            thumbnail
            song_name
            artist_name
            vextab_string
            bpm
            dead_time_ms
            duration_ms
          ))

      if current_user.try(:has_role?, :admin)
        params_base.merge(params.require(:notation).permit(:featured))
      else
        params_base
      end
    end
end
