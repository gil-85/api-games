<?php
    $mainCss = '../Asset/css/main.css';
    $researchCss = '../Asset/css/research.css';

    $mainJs = '../Asset/js/main.js';
    $researchJs = '../Asset/js/research.js';

    $title = 'RESEARCH';

    include_once('Templates/header.php')
  ?>
  <h2>Research</h2>
  <div class="content-primary" id="content">
    <form action="list.html" id="display_column">
     
      <input type="text" class="switch" id="name" placeholder="NAME">
      
      <button type="button" id="btn-search_switch">SEARCH BY FILTERS</button>
      
      <button type="button" class="open_research switch disabled" id="platforms"disabled>PLATFORMS<span class="counter">0</span></button>
      <button type="button" class="open_research switch disabled" id="genres" disabled>GENRES<span class="counter">0</span></button>
      <button type="button" class="open_research switch disabled" id="tags" disabled>TAGS<span class="counter">0</span></button>
      <button type="button" class="open_research switch disabled" id="releases" disabled>RELEASE DATE<span  class="counter">UNSET</span></button>
     
      <button type="button" class="switch disabled" id="btn-more_filters">MORE</button>

      <button type="button" class="open_research extra ghost" id="creators" >CREATORS<span class="counter">0</span></button>
      <button type="button" class="open_research extra ghost" id="updates">UPDATES<span class="counter">UNSET</span></button>
      <button type="button" class="open_research extra ghost" id="publishers">PUBLISHERS<span class="counter">0</span></button>
      <button type="button" class="open_research extra ghost "id="developers">DEVELOPERS<span class="counter">0</span></button>
      
     
      <button type="submit">ENTER<span>◣ RESET ◢</span></button>
    </form>
    
    
    <!-- ////      PLATFORMS      //// -->
    <div class="ghost" id="e_platforms_e">
      <div class="d-grid_1" id="d-platforms_selected">
      </div>
      <div class="d-grid_2" id="d-platforms_list">
        <div class="a-btn btn-more">
          <button id="btn-load_more_plats">More</button>
        </div>
      </div>
        <div class="d-grid_3">
          <div class="a-btn">
            <button class="hide_list" id="e_platforms">[ O ]</button>
          </div>
        </div>
    </div>
    
     <!-- ////     GENRES     //// -->
    <div class="ghost" id="e_genres_e">
      <div class="d-grid_1" id="d-genres_selected">
      </div>
      <div class="d-grid_2" id="d-genres_list">
        <div class="a-btn btn-more">
          <button id="btn-load_more_genres">More</button>
        </div>
      </div>
      <div class="d-grid_3">
        <div class="a-btn">
          <button class="hide_list" id="e_genres">[ O ]</button>
        </div>
      </div>
    </div>
    
    <!-- ////      TAGS      //// -->
    <div class="ghost" id="e_tags_e">
      <div class="d-grid_1" id="d-tags_selected">
      </div>
      <div class="d-grid_2" id="d-tags_list">
        <div class="d-grid_2_input-hand">
          <div class="ninja" id="d-tag_not_found">
            <p>Tag not found</p>
          </div>
          <div id="d-input_tag">
            <input type="text" id="tag" placeholder="Tag">
          </div>
          <div class="a-btn">
            <button type="button" class="btn-search_hand" id="btn-search_tags">Enter</button>
          </div>
        </div>
      </div>
      <div class="d-grid_3">
        <div class="a-btn">
          <button class="hide_list" id="e_tags">[ O ]</button>
        </div>
      </div>
    </div>
    
   <!-- ////     RELEASE DATE      //// -->
    <div class="ghost" id="e_releases_e">
      <div class="d-grid_1" id="d-releases_selected">
        <div class="d-element_date" id="d-element_releases"></div>
      </div>
      <div class="d-grid_2" id="d-releases_list">
        <div class="d-grid_2_input-hand">
          <div class="ninja" id="d-releases_incorrect">
            <p>Dates incorrect</p>
          </div>
          <div class="d-d-input_date">
            <div class="d-input_date">
              <label for="release_start">Start</label>
              <input type="date" id="release_start">
            </div>
            <div class="d-input_date">
              <label for="release_end">End</label>
              <input type="date" id="release_end">
            </div>
          </div>
          <div class="a-btn">
            <button type="button" id="btn-clear_releases">Clear</button>
          </div>
        </div>
      </div>
      <div class="d-grid_3">
        <div class="a-btn">
          <button class="hide_list" id="e_releases">[ O ]</button>
        </div>
      </div>
    </div>
    
    <!-- ////      CREATORS     //// -->
    <div class="ghost" id="e_creators_e">
      <div class="d-grid_1" id="d-creators_selected">
      </div>
      <div class="d-grid_2" id="d-creators_list">
        <div class="d-grid_2_input-hand">
          <div class="ninja" id="d-creator_not_found">
            <p>Creator not found</p>
          </div>
          <div id="d-input_tag">
            <input type="text" id="creator" placeholder="Creator">
          </div>
          <div class="a-btn">
            <button type="button" class="btn-search_hand"  id="btn-search_creators">Enter</button>
          </div>
        </div>
      </div>
      <div class="d-grid_3">
        <div class="a-btn">
          <button class="hide_list" id="e_creators">[ O ]</button>
        </div>
      </div>
    </div>
    
      <!-- ////     UPDATES      //// -->
    <div class="ghost" id="e_updates_e">
      <div class="d-grid_1" id="d-updates_selected">
        <div class="d-element_date" id="d-element_updates"></div>
      </div>
      <div class="d-grid_2" id="d-updates_list">
        <div class="d-grid_2_input-hand">
          <div class="ninja" id="d-updates_incorrect">
            <p>Dates incorrect</p>
          </div>


          <div class="d-d-input_date">
            <div class="d-input_date">
              <label for="update_start">Start</label>
              <input type="date" id="update_start">
            </div>
            <div class="d-input_date">
              <label for="update_end">End</label>
              <input type="date" id="update_end">
            </div>
          </div>


          <div class="a-btn">
            <button type="button" id="btn-clear_updates">Clear</button>
          </div>
        </div>
      </div>
      <div class="d-grid_3">
        <div class="a-btn">
          <button class="hide_list" id="e_updates">[ O ]</button>
        </div>
      </div>
    </div>


    <!-- ////      PUBLISHERS     //// -->
    <div class="ghost" id="e_publishers_e">
          <div class="d-grid_1" id="d-publishers_selected">
          </div>
          <div class="d-grid_2" id="d-publishers_list">
            <div class="d-grid_2_input-hand">
              <div class="ninja" id="d-publisher_not_found">
                <p>Publisher not found</p>
              </div>
              <div id="d-input_tag">
                <input type="text" id="publisher" placeholder="Publisher">
              </div>
              <div class="a-btn">
                <button type="button" class="btn-search_hand"  id="btn-search_publishers">Enter</button>
              </div>
            </div>
          </div>
          <div class="d-grid_3">
            <div class="a-btn">
              <button class="hide_list" id="e_publishers">[ O ]</button>
            </div>
          </div>
    </div>

        <!-- ////      DEVELOPERS     //// -->
        <div class="ghost" id="e_developers_e">
          <div class="d-grid_1" id="d-developers_selected">
          </div>
          <div class="d-grid_2" id="d-developers_list">
            <div class="d-grid_2_input-hand">
              <div class="ninja" id="d-developer_not_found">
                <p>Developer not found</p>
              </div>
              <div id="d-input_tag">
                <input type="text" id="developer" placeholder="Developer">
              </div>
              <div class="a-btn">
                <button type="button" class="btn-search_hand"  id="btn-search_developers">Enter</button>
              </div>
            </div>
          </div>
          <div class="d-grid_3">
            <div class="a-btn">
              <button class="hide_list" id="e_developers">[ O ]</button>
            </div>
          </div>
        </div>
    
  </div>
  <!-- footer -->
  <?php
    include_once('Templates/footer.php')
  ?>
</body>
</html>