$(function () {
    
    var EASE = Power4.easeOut;
    
    var Engine = {
      ui : {
        initBtn : function() {
          var card = $('.card, .btn');
          var body = $('body');
          var btn = $('.btn');
  
          card.on('click', function() {
  
            if (body.hasClass('is-open')) {
              body.removeClass('is-open');
              btn.html('View');
            } else {
                body.addClass('is-open');
                btn.html('close');
              TweenMax.set('.card', {clearProps: 'all'});
            }
          })     
        },
        initHover : function(e) {
          $(document).on( "mousemove", ".card", function(e) {
            if ($('body').hasClass('is-open')) {
              e.preventDefault();
            } else {
              var halfW = (this.clientWidth / 2);
              var halfH = (this.clientHeight / 2);
  
              var coorX = (halfW - (event.pageX - this.offsetLeft));
              var coorY = (halfH - (event.pageY - this.offsetTop));
  
              var degX  = ( ( coorY / halfH ) * 10 ) + 'deg'; 
              var degY  = ( ( coorX / halfW ) * -10 ) + 'deg'; 
  
              $(this).css('transform', function() {
                return 'perspective(1600px) translate3d(0, 0px, 0) scale(0.6) rotateX('+ degX +') rotateY('+ degY +')';
              }).children('.card-title-wrap').css( 'transform', function() {
                return 'perspective(1600px) translate3d(0, 0, 200px) rotateX('+ degX +') rotateY('+ degY +')';
              });
            }
          }).on( "mouseout", ".card", function() {
            $(this).removeAttr('style').children('.card-title-wrap').removeAttr('style');
          });
          
          
        }
      }
    };
  
    Engine.ui.initBtn();
    Engine.ui.initHover();
  
  })

// const API_URL = "http://your-ec2-public-dns:5000/api/temperature";

//     async function fetchTemperatureData() {
//       try {
//         console.log(`Fetching data from ${API_URL}`);
//         const response = await fetch(API_URL);
//         console.log('Response status:', response.status);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log('Data received:', data);
//         displayTemperatureData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     async function deleteTemperature(id) {
//       try {
//         const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         console.log(`Record with id ${id} deleted`);
//         fetchTemperatureData();  // Refresh the list
//       } catch (error) {
//         console.error('Error deleting data:', error);
//       }
//     }

//     async function editTemperature(id, location) {
//       const newLocation = prompt('Enter new location:', location);
//       if (newLocation !== null) {
//         try {
//           const response = await fetch(`${API_URL}/${id}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ location: newLocation })
//           });
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           console.log(`Record with id ${id} updated`);
//           fetchTemperatureData();  // Refresh the list
//         } catch (error) {
//           console.error('Error updating data:', error);
//         }
//       }
//     }

//     function displayTemperatureData(data) {
//       const list = document.getElementById('temperature-list');
//       list.innerHTML = '';  // Clear any existing content
//       data.forEach(temp => {
//         const listItem = document.createElement('li');
//         listItem.textContent = `${temp.temperature} °C at ${temp.location} on ${new Date(temp.timestamp).toLocaleString()}`;
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.onclick = () => deleteTemperature(temp.id);
//         const editButton = document.createElement('button');
//         editButton.textContent = 'Edit';
//         editButton.onclick = () => editTemperature(temp.id, temp.location);
//         listItem.appendChild(editButton);
//         listItem.appendChild(deleteButton);
//         list.appendChild(listItem);
//       });
//     }

//     fetchTemperatureData();
