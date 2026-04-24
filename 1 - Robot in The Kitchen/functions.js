import * as THREE from 'three';


export function createKitchen(scene, renderer, camera, gui) {
        const loader = new THREE.TextureLoader();
        const stovetexture = loader.load('textures/stove.jpg');
        const floortexture = loader.load('textures/floortexture.jpg');
        const walltexture = loader.load('textures/walltexture.jpg');
        const kitchentexture = loader.load('textures/countertexture.jpg');
        const platetexture = loader.load('textures/platetexture.png');
        const cuptexture = loader.load('textures/cuptexture.png');    

        var floorgeometry = new THREE.PlaneGeometry( 3, 3 );
        var floormaterial = new THREE.MeshStandardMaterial( {map: floortexture, side: THREE.DoubleSide } );
        const floorplane = new THREE.Mesh( floorgeometry, floormaterial );
        scene.add(floorplane);
    

        

        floorplane.receiveShadow = true;
        

        //creating behind wall to join with floor
        var wallgeometry = new THREE.PlaneGeometry( 3, 3);
        var wallmaterial = new THREE.MeshStandardMaterial( { map: walltexture, side: THREE.DoubleSide } );
        const wallplane = new THREE.Mesh( wallgeometry, wallmaterial );

        wallplane.rotation.x = Math.PI / 2;
        wallplane.position.y = 1.5;
        wallplane.position.z = 1.5;
        wallplane.position.x = 0;
        scene.add(wallplane);

        //creating left wall to join with floor
        var wallgeometry2 = new THREE.PlaneGeometry( 3, 3);
        var wallmaterial2 = new THREE.MeshStandardMaterial( { map: walltexture, side: THREE.DoubleSide } );
        const wallplane2 = new THREE.Mesh( wallgeometry2, wallmaterial2 );

        wallplane2.rotation.z = Math.PI / 2;
        wallplane2.rotation.y = Math.PI /2;
        wallplane2.position.x = -1.5;
        //wallplane2.position.y = 1.5;
        wallplane2.position.z = 1.5;
        scene.add(wallplane2); 

        //creating a kitchen counter to place in front of the camera
        var countergeometry = new THREE.BoxGeometry(2, 0.5, 0.5 );
        var countermaterial = new THREE.MeshStandardMaterial( { map: kitchentexture} );
        const counter = new THREE.Mesh( countergeometry, countermaterial );
        counter.position.x = -0.5;
        counter.position.y = 1.25;
        counter.position.z = 0.25;
        counter.castShadow = true;
        counter.receiveShadow = true;
        scene.add(counter);
        

        var stovegeometry = new THREE.PlaneGeometry(0.5, 0.25);
        //var stovematerial = new THREE.MeshBasicMaterial( { color: 0xa8b0b2, side: THREE.DoubleSide});
        var stovematerial = new THREE.MeshStandardMaterial({map: stovetexture, side: THREE.DoubleSide });
        const stove = new THREE.Mesh(stovegeometry, stovematerial);
        stove.position.z = 0.55;
        stove.position.y = 1.25;
        stove.position.x = -1;
        stove.castShadow = true;
        scene.add(stove);

        var plategeometry = new THREE.CylinderGeometry(0.15, 0.05, 0.05, 32);
        var platematerial = new THREE.MeshStandardMaterial( { map: platetexture} );
        const plate = new THREE.Mesh(plategeometry, platematerial); 
        plate.rotation.x = Math.PI / 2;
        plate.position.z = 0.55;
        plate.position.y = 1.25;
        plate.position.x = -0.5;
        plate.receiveShadow = true;
        plate.castShadow = true;

        scene.add(plate);

        var cupgeometry = new THREE.CylinderGeometry(0.05, 0.01, 0.05, 32);
        var cupmaterial = new THREE.MeshStandardMaterial( { map: cuptexture} );
        const cup = new THREE.Mesh(cupgeometry, cupmaterial); 
        cup.rotation.x = Math.PI / 2;
        cup.position.z = 0.55;
        cup.position.y = 1.25;
        cup.position.x = -0.25;
        cup.receiveShadow = true;
        cup.castShadow = true;

        

        scene.add(cup);

        
}

export function createRobot(scene, renderer, camera, gui){
    //creating a robot belly

    const loader = new THREE.TextureLoader();
    const bellytexture = loader.load('textures/bellytexture.jpg');
    const facetexture = loader.load('textures/robotface.jpeg');

//         var robotbellygeometry = new THREE.BoxGeometry(2, 0.5, 0.5 );
//         var robotbellymaterial = new THREE.MeshStandardMaterial( { map: bellytexture} );
//         const robotbelly = new THREE.Mesh( robotbellygeometry, robotbellymaterial );
//         scene.add(robotbelly);

    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    
        
    var robotgeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      var material = new THREE.MeshStandardMaterial({ map: bellytexture });
      var cube = new THREE.Mesh(robotgeometry, material);

    robotGroup.add(cube);
    robotGroup.position.y = 0.5;
    robotGroup.position.z = 1.0;
    robotGroup.rotation.x = Math.PI / 2;
    

    var neckgeometry = new THREE.CylinderGeometry(0.1, 0.05, 0.2, 32);
      var neckmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });
      var neck = new THREE.Mesh(neckgeometry, neckmaterial);
      neck.position.y = 0.25;
      cube.add(neck);  

    var robotheadgeometry = new THREE.SphereGeometry(0.2);
      var robotheadmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });
      var robothead = new THREE.Mesh(robotheadgeometry, robotheadmaterial);
      robothead.position.y = 0.55;
      cube.add(robothead);
    
    
    //right arm group - > groups allow us to move the shoulder and arm together without having to 
    // ry about the position of the shoulder and arm separately
    const rightArmGroup = new THREE.Group();
        rightArmGroup.position.set(-0.3, 0.1, 0); // shoulder position
        cube.add(rightArmGroup);
    rightArmGroup.name = 'RightArmGroup';


    //right shoulder and arm
    var robotshoulder2geometry = new THREE.SphereGeometry(0.1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
        var robotshoulder2material = new THREE.MeshStandardMaterial({ color: 0x000000 });   
        var robotshoulderright = new THREE.Mesh(robotshoulder2geometry, robotshoulder2material);
        robotshoulderright.rotation.z = -Math.PI / 3;
        // robotshoulderright.position.x = -0.3;
        // robotshoulderright.position.y = 0.1; -> x,y not required when using group
        //cube.add(robotshoulderright);

    rightArmGroup.add(robotshoulderright);
    robotshoulderright.position.set(0, 0, 0);
    robotshoulderright.name = 'RightShoulder';

    const shoulderAxes = new THREE.AxesHelper(0.2);
    robotshoulderright.add(shoulderAxes);

   
    const robotarmright = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32),
    new THREE.MeshStandardMaterial({ map: bellytexture })
    );
    robotarmright.position.set(0, -0.1, 0);  // relative to shoulder
    robotshoulderright.add(robotarmright);

    // //right elbow
    const robotelbowright = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    robotelbowright.position.set(0, -0.1, 0); // relative to arm
    robotarmright.add(robotelbowright);

    const elbowAxes = new THREE.AxesHelper(0.15);
    robotelbowright.add(elbowAxes);

    //right forearm
    var robotforearmrightgeometry = new THREE.CylinderGeometry(0.025, 0.05, 0.2, 32);
        var robotforearmrightmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });
        var robotforearmright = new THREE.Mesh(robotforearmrightgeometry, robotforearmrightmaterial);
        robotforearmright.position.x = 0;
        robotforearmright.position.y = -0.1;
        robotforearmright.position.z = 0;
        //robotforearmright.rotation.z = Math.PI / 3;
        robotelbowright.add(robotforearmright);

    const forearmAxes = new THREE.AxesHelper(0.15);
    robotforearmright.add(forearmAxes);

    //gripper
    
    var robotrightgrippergeometry = new THREE.SphereGeometry(0.05, 32);
        var robotrightgrippermaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
        var robotrightgripper = new THREE.Mesh(robotrightgrippergeometry, robotrightgrippermaterial);
        robotrightgripper.rotation.z = Math.PI / 3;
        robotrightgripper.position.x = 0;
        robotrightgripper.position.y = -0.1;
        robotforearmright.add(robotrightgripper);
    
    
    //left arm group
    const leftArmGroup = new THREE.Group();
        leftArmGroup.position.set(0.3, 0.1, 0);
        cube.add(leftArmGroup);
    leftArmGroup.name = 'LeftArmGroup';

    //left shoulder and arm
    var robotshoulderleftgeometry = new THREE.SphereGeometry(0.1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
        var robotshoulder2material = new THREE.MeshStandardMaterial({ color: 0x000000 });   
        var robotshoulderleft = new THREE.Mesh(robotshoulderleftgeometry, robotshoulder2material);
        robotshoulderleft.rotation.z = Math.PI / 3;
        // robotshoulderleft.position.x = 0.3;
        // robotshoulderleft.position.y = 0.1; -> x,y not required when using group
        //cube.add(robotshoulderleft);

    leftArmGroup.add(robotshoulderleft);
    robotshoulderleft.position.set(0, 0, 0);
    robotshoulderleft.name = 'LeftShoulder';

    //left arm
    const robotarmleft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32),
    new THREE.MeshStandardMaterial({ map: bellytexture })
    );
    robotarmleft.position.set(0, -0.1, 0);  // relative to shoulder
    robotshoulderleft.add(robotarmleft);

    //left elbow
    const robotelbowleft = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    robotelbowleft.position.set(0, -0.1, 0); // relative to arm
    robotarmleft.add(robotelbowleft);


    //left forearm
    var robotforearmleftgeometry = new THREE.CylinderGeometry(0.025, 0.05, 0.2, 32);
        var robotforearmleftmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });
        var robotforearmleft = new THREE.Mesh(robotforearmleftgeometry, robotforearmleftmaterial);
        robotforearmleft.position.x = 0;
        robotforearmleft.position.y = -0.1;
        robotforearmleft.position.z = 0;
        //robotforearmleft.rotation.z = Math.PI / 3;
        robotelbowleft.add(robotforearmleft);

    //gripper
    
    var robotleftgrippergeometry = new THREE.SphereGeometry(0.05, 32);
        var robotleftgrippermaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
        var robotleftgripper = new THREE.Mesh(robotleftgrippergeometry, robotleftgrippermaterial);
        robotleftgripper.rotation.z = -Math.PI / 3;
        robotleftgripper.position.x = 0;
        robotleftgripper.position.y = -0.1;
        robotforearmleft.add(robotleftgripper);



    var robotleggeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.7, 32);
        var robotlegmaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
        var robotleg = new THREE.Mesh(robotleggeometry, robotlegmaterial);
        robotleg.position.y = -0.6;
        robotleg.position.x = -0.15;
        //robotleg.rotation.z = -45;
        cube.add(robotleg);

    var robotleg2geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.7, 32);
        var robotleg2material = new THREE.MeshStandardMaterial();
        var robotleg2 = new THREE.Mesh(robotleg2geometry, robotleg2material);
        robotleg2.position.y = -0.6;
        robotleg2.position.x = 0.15;
        //robotleg.rotation.z = -45;
        cube.add(robotleg2);

    
    

    robotGroup.traverse((obj) => {
    if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
    }
    });
    
    

     return {
        
        leftArmGroup: leftArmGroup,
        leftShoulder: robotshoulderleft,
        leftArm: robotarmleft,
        leftElbow: robotelbowleft,
        leftforeArm: robotforearmleft,
        leftGripper: robotleftgripper,
        rightArmGroup: rightArmGroup,
        rightShoulder: robotshoulderright,
        rightArm: robotarmright,
        rightElbow: robotelbowright,
        rightforeArm: robotforearmright,
        rightGripper: robotrightgripper,
        

        };

}

export function animateRobotJoints(robot) {
    const time = Date.now() * 0.002; 
    robot.rightShoulder.rotation.z = Math.sin(time) * Math.PI / 4;   
    robot.rightElbow.rotation.z = Math.sin(time * 1.5) * Math.PI / 6;
    robot.leftShoulder.rotation.z = -Math.sin(time) * Math.PI / 4;
    robot.leftElbow.rotation.z = -Math.sin(time * 1.5) * Math.PI / 6;
}


// //left shoulder and arm
//       var robotleftshouldergeometry = new THREE.SphereGeometry(0.1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
//         var robotshouldermaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });   
//         var robotshoulderleft = new THREE.Mesh(robotleftshouldergeometry, robotshouldermaterial);
//         robotshoulderleft.rotation.z = Math.PI / 3;
//         robotshoulderleft.position.x = 0.3;
//         robotshoulderleft.position.y = 0.1;
//         cube.add(robotshoulderleft);

//     var robotarmleftgeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
//         var robotarmleftmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });   
//         var robotarmleft = new THREE.Mesh(robotarmleftgeometry, robotarmleftmaterial);
//         //robotarmleft.rotation.z = -Math.PI / 12;
//         robotarmleft.position.x = 0;
//         robotarmleft.position.y = -0.1;
//         //robotarmleft.position.y = 0.15;
//         robotshoulderleft.add(robotarmleft);
    
        // var robotelbowleftgeometry = new THREE.SphereGeometry(0.05, 32, 32);
        // var robotelbowleftmaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
        // var robotelbowleft = new THREE.Mesh(robotelbowleftgeometry, robotelbowleftmaterial); 
        // robotelbowleft.position.x = -0.5;
        // robotelbowleft.position.y = 0.75;
        // robotelbowleft.rotation.z = -Math.PI / 3;
        // robotarmleft.add(robotelbowleft);

//         //problem^

//     var robotforearmleftgeometry = new THREE.CylinderGeometry(0.025, 0.05, 0.2, 32);
//         var robotforearmleftmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });
//         var robotforearmleft = new THREE.Mesh(robotforearmleftgeometry, robotforearmleftmaterial);
//         robotforearmleft.rotation.z = -Math.PI / 3;
//         robotforearmleft.position.x = -0.1;
//         robotforearmleft.position.y = -0.05;
//         robotelbowleft.add(robotforearmleft);

//     var robotleftgrippergeometry = new THREE.SphereGeometry(0.05, 32);
//         var robotleftgrippermaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
//         var robotleftgripper = new THREE.Mesh(robotleftgrippergeometry, robotleftgrippermaterial);
//         robotleftgripper.rotation.z = -Math.PI / 3;
//         robotleftgripper.position.x = 0;
//         robotleftgripper.position.y = -0.1;
//         robotforearmleft.add(robotleftgripper);

//     //right shoulder and arm
//     var robotshoulder2geometry = new THREE.SphereGeometry(0.1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
//         var robotshoulder2material = new THREE.MeshStandardMaterial({ color: 0x000000 });   
//         var robotshoulderright = new THREE.Mesh(robotshoulder2geometry, robotshoulder2material);
//         robotshoulderright.rotation.z = -Math.PI / 3;
//         robotshoulderright.position.x = -0.3;
//         robotshoulderright.position.y = 0.1;
//         cube.add(robotshoulderright);
    
//     var robotarmrightgeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
//         var robotarmrightmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });   
//         var robotarmright = new THREE.Mesh(robotarmrightgeometry, robotarmrightmaterial);
//         //robotarmright.rotation.z = -Math.PI / 3;
//         robotarmright.position.x = 0;
//         robotarmright.position.y = -0.1;
//         robotshoulderright.add(robotarmright);
    

//     var robotelbowrightgeometry = new THREE.SphereGeometry(0.05, 32, 32);
//         var robotelbowrightmaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
//         var robotelbowright = new THREE.Mesh(robotelbowrightgeometry, robotelbowrightmaterial);
//         robotelbowright.position.x = 0.5;
//         robotelbowright.position.y = 0.75;
//         robotelbowright.rotation.z = Math.PI / 3;
//         robotarmright.add(robotelbowright);

//     //problem^


//     var robotforearmrightgeometry = new THREE.CylinderGeometry(0.025, 0.05, 0.2, 32);
//         var robotforearmrightmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });
//         var robotforearmright = new THREE.Mesh(robotforearmrightgeometry, robotforearmrightmaterial);
//         robotforearmright.rotation.z = Math.PI / 3;
//         robotforearmright.position.x = 0.1;
//         robotforearmright.position.y = -0.05;
//         robotelbowright.add(robotforearmright);


//     var robotrightgrippergeometry = new THREE.SphereGeometry(0.05, 32);
//         var robotrightgrippermaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
//         var robotrightgripper = new THREE.Mesh(robotrightgrippergeometry, robotrightgrippermaterial);
//         robotrightgripper.rotation.z = Math.PI / 3;
//         robotrightgripper.position.x = 0;
//         robotrightgripper.position.y = -0.1;
//         robotforearmright.add(robotrightgripper);