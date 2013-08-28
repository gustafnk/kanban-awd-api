class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]

  skip_before_filter :verify_authenticity_token

  # GET /items
  # GET /items.json
  def index
    @items = Item.all
  end

  def navigation
    render 'navigation'
  end

  def backlog
    status = 'Backlog'
    @items = Item.where(:status => status.downcase)
    @status = status

    render 'category'
  end

  def move_to_backlog
    set_item
    @item.status = "backlog"
    @item.save
    
    redirect_unless_ajax
  end

  def working
    status = 'Working'
    @items = Item.where(:status => status.downcase)
    @status = status

    # TODO Refactor when rules are in model
    @ready_to_pull = Item.where(:status => "backlog").collect do |item|
      [item.title, item.id]
    end

    render 'category'
  end

  def move_to_working
    set_item

    @item.status = "working"
    @item.save

    redirect_unless_ajax
  end

  def verify
    status = 'Verify'
    @items = Item.where(:status => status.downcase)
    @status = status

    render 'category'
  end

  def move_to_verify
    set_item

    @item.status = "verify"
    @item.save

    redirect_unless_ajax
  end

  def done
    status = 'Done'
    @items = Item.where(:status => status.downcase)
    @status = status

    # TODO Refactor when rules are in model
    @ready_to_pull = Item.where(:status => "verify").collect do |item|
      [item.title, item.id]
    end

    render 'category'
  end

  def move_to_done
    set_item

    @item.status = "done"
    @item.save

    redirect_unless_ajax
  end

  def pull
    puts params
    set_item

    @item.status = params[:status]
    @item.save

    redirect_unless_ajax
  end


  # GET /items/1
  # GET /items/1.json
  def show
  end

  # GET /items/new
  def new
    @item = Item.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  # POST /items.json
  def create
    @item = Item.new(item_params)
    @item.status = 'backlog'

    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, notice: 'Item was successfully created.' }
        format.json { render action: 'show', status: :created, location: @item }
      else
        format.html { render action: 'new' }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    respond_to do |format|
      if @item.update(item_params)
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item.destroy
    respond_to do |format|
      format.html { redirect_to items_url }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_item
    @item = Item.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def item_params
    params.require(:item).permit(:title, :description, :status)
  end

  def redirect_unless_ajax
    if request.xhr?
      head :ok, :content_type => 'text/html'
    else
      redirect_to request.referer
    end
  end
end
