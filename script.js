$('document').ready(function() {

   $.getJSON("data.json", cache="false", function(data) {
        var $cbmDiv = $('#cbm');
          $.each(data.cbm, function(i,data) {
            var $competencyGroupDiv = $('#'+data.CompetencyGroup.replace(/\s/g,'')),
                $competencyDiv = $('#'+data.Competency.replace(/\s/g,'')),
                $functionalComponentDiv = $('#'+data.FunctionalComponent.replace(/\s/g,''));

            if($competencyGroupDiv.length === 0) {
              $competencyGroupDiv = $('<div/>');
              $competencyGroupDiv.attr('id',data.CompetencyGroup.replace(/\s/g,''));
              $competencyGroupDiv.attr('class','CompetencyGroup');
              $competencyGroupDiv.html('<p class="CompetencyGroupHeader" id="'+data.CompetencyGroup+'Header">'+data.CompetencyGroup+'</p>');
              $cbmDiv.append($competencyGroupDiv);
            }

            if($competencyDiv.length === 0) {
              $competencyDiv = $('<div/>');
              $competencyDiv.attr('id',data.Competency.replace(/\s/g,''));
              $competencyDiv.attr('class','Competency');
              $competencyDiv.html('<p class="CompetencyHeader" id="'+data.Competency+'Header">'+data.Competency+'</p>');
              $competencyGroupDiv.append($competencyDiv);
            }
            
            if($functionalComponentDiv.length === 0) {
              $functionalComponentDiv = $('<div/>');
              $functionalComponentDiv.attr('id',data.FunctionalComponent.replace(/\s/g,''));
              $functionalComponentDiv.attr('class','FunctionalComponent');
              $functionalComponentDiv.attr('title',data.FunctionalComponentDescription);
              $functionalComponentDiv.html(data.FunctionalComponent);
              $competencyDiv.append($functionalComponentDiv);
            }

            var maxFunctionComponents = 4;
            if(($competencyDiv.children(".FunctionalComponent").length) > maxFunctionComponents){
              var numberOfColumns = Math.ceil($competencyDiv.children(".FunctionalComponent").length / maxFunctionComponents),
                  columnWidth = 160,
                  marginWidth = 15,
                  newWidth = columnWidth + (columnWidth+marginWidth)*(numberOfColumns-1);
              $competencyDiv.width(newWidth+"px"); 
            }
        });
  
        function mouseout($this) {
            $this.removeClass('hover');
            try {
                getChildren($this).removeClass('children');
            } catch (err) {
                console.error('error in user code');
            }
        
        }
        
        function mouseover($this) {
            $this.addClass('hover');
            try {
                getChildren($this).addClass('children');
            } catch(err) {
                console.error('error in user code');
            }
        }

        function showToolTip($this) {
          var title = $this.attr('title');
          $(this).data('tipText', title).removeAttr('title');
          $('<p/>')
            .addClass('tooltip')
            .text(title)
            .appendTo('body')
            .fadeIn('slow');          
        }

        function removeToolTip($this) {
          $(this).attr('title',$(this).data('tipText'));
          $('.tooltip').remove();         
        }

        $('.FunctionalComponent').hover(
            function() {       
                mouseover($(this));
                showToolTip($(this));
            },
            
            function() {
                mouseout($(this));
                removeToolTip($(this));
            }
        ).mousemove(function(e) {
          var mouseX = e.pageX + 20,
              mouseY = e.pageY + 10;
          $('.tooltip').css({top: mouseY, left: mouseX})
        });

    });
});
