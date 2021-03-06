
    // **************CANVAS01
    let 
        canvas01 = document.querySelector('#canvas01'),
        context = canvas01.getContext('2d');

    canvas01.width = 600;
    canvas01.height = 600;

    context.scale(.7, .7);
    

    context.lineWidth = 5;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas01.width * 1.7, canvas01.height * 1.7); // filling background with white color
    context.fill();
    

    // **************CANVAS02
    let 
        canvas02 = document.querySelector('#canvas02'),
        context02 = canvas02.getContext('2d');
    
    canvas02.width = 600;
    canvas02.height = 50;


    // *************STAR COORDINATES, POSITION COORDINATES, FILL COLORS
    let 
        star = [[17, 50], [70, 50], [25, 77], [45, 135], [0, 95], [-45, 135], [-25, 77], [-70, 50], [-17, 50]],
        positions = [[450, 50], [450, 200], [450, 350], [450, 500], [450, 650]],
        colors = ['red', 'blue', 'green', 'yellow', 'black'];

    // ************DRAWING STARS
    positions.forEach((pos, ind) => {

    let currentStar = star.map(elem => [elem[0] + pos[0], elem[1] + pos[1]]);

    context.fillStyle = colors[ind];

    context.beginPath();
    context.moveTo(...pos);             // START POSITION

    for (let n in currentStar) {        // DRAWING POINTS
        context.lineTo(...currentStar[n]);
    }

    context.closePath();
    context.stroke();
    context.fill();



    })

    context02.fillStyle = 'white';
    context02.fillRect(0, 0, canvas02.width, canvas02.height);
    context02.fill();
    
    // **************EVENT LISTENER
    canvas01.addEventListener('mousedown', (e) => {

        let color = context.getImageData(e.clientX, e.clientY, 1, 1).data;

        context02.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        context02.fillRect(0, 0, canvas02.width, canvas02.height);
        context02.fill();
    })
