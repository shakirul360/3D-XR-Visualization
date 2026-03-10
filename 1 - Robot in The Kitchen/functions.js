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
        scene.add(counter);
        

        var stovegeometry = new THREE.PlaneGeometry(0.5, 0.25);
        //var stovematerial = new THREE.MeshBasicMaterial( { color: 0xa8b0b2, side: THREE.DoubleSide});
        var stovematerial = new THREE.MeshStandardMaterial({map: stovetexture, side: THREE.DoubleSide });
        const stove = new THREE.Mesh(stovegeometry, stovematerial);
        stove.position.z = 0.55;
        stove.position.y = 1.25;
        stove.position.x = -1;
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

        // White directional light at half intensity shining from the top.
        const light = new THREE.DirectionalLight( 0xffffff, 3 );
        light.position.set(15,-15,5);
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 100;
        light.castShadow = true;
        scene.add( light );

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        light.castShadow = true;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        camera.position.z = 5; 

      const lightFolder = gui.addFolder('Directional Light');
        lightFolder.add(light, 'intensity', 0, 5);
        lightFolder.add(light.position, 'x', -20, 20);
        lightFolder.add(light.position, 'y', -20, 20);
        lightFolder.add(light.position, 'z', -20, 20);
      
      const ambientLightFolder = gui.addFolder('Ambient Light');
        ambientLightFolder.add(ambientLight, 'intensity', 0, 5);

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
        
    var robotgeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      var material = new THREE.MeshStandardMaterial({ map: bellytexture });
      var cube = new THREE.Mesh(robotgeometry, material);
      scene.add(cube);

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
    
    //left shoulder and arm
      var robotshouldergeometry = new THREE.SphereGeometry(0.1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
        var robotshouldermaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });   
        var robotshoulderleft = new THREE.Mesh(robotshouldergeometry, robotshouldermaterial);
        robotshoulderleft.rotation.z = Math.PI / 3;
        robotshoulderleft.position.x = 0.3;
        robotshoulderleft.position.y = 0.1;
        cube.add(robotshoulderleft);

    var robotarmleftgeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
        var robotarmleftmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });   
        var robotarmleft = new THREE.Mesh(robotarmleftgeometry, robotarmleftmaterial);
        //robotarmleft.rotation.z = -Math.PI / 12;
        robotarmleft.position.x = 0;
        robotarmleft.position.y = -0.1;
        //robotarmleft.position.y = 0.15;
        robotshoulderleft.add(robotarmleft);
    
        var robotelbowleftgeometry = new THREE.SphereGeometry(0.05, 32, 32);
        var robotelbowleftmaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
        var robotelbowleft = new THREE.Mesh(robotelbowleftgeometry, robotelbowleftmaterial); 
        robotelbowleft.position.x = -0.5;
        robotelbowleft.position.y = 0.75;
        robotelbowleft.rotation.z = -Math.PI / 3;
        robotarmleft.add(robotelbowleft);

    var robotforearmleftgeometry = new THREE.CylinderGeometry(0.025, 0.05, 0.2, 32);
        var robotforearmleftmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });
        var robotforearmleft = new THREE.Mesh(robotforearmleftgeometry, robotforearmleftmaterial);
        robotforearmleft.rotation.z = -Math.PI / 3;
        robotforearmleft.position.x = -0.1;
        robotforearmleft.position.y = -0.05;
        robotelbowleft.add(robotforearmleft);

    var robotleftgrippergeometry = new THREE.SphereGeometry(0.05, 32);
        var robotleftgrippermaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
        var robotleftgripper = new THREE.Mesh(robotleftgrippergeometry, robotleftgrippermaterial);
        robotleftgripper.rotation.z = -Math.PI / 3;
        robotleftgripper.position.x = 0;
        robotleftgripper.position.y = -0.1;
        robotforearmleft.add(robotleftgripper);

    //right shoulder and arm
    var robotshoulder2geometry = new THREE.SphereGeometry(0.1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
        var robotshoulder2material = new THREE.MeshStandardMaterial({ color: 0x000000 });   
        var robotshoulderright = new THREE.Mesh(robotshoulder2geometry, robotshoulder2material);
        robotshoulderright.rotation.z = -Math.PI / 3;
        robotshoulderright.position.x = -0.3;
        robotshoulderright.position.y = 0.1;
        cube.add(robotshoulderright);
    
    var robotarmrightgeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
        var robotarmrightmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });   
        var robotarmright = new THREE.Mesh(robotarmrightgeometry, robotarmrightmaterial);
        //robotarmright.rotation.z = -Math.PI / 3;
        robotarmright.position.x = 0;
        robotarmright.position.y = -0.1;
        robotshoulderright.add(robotarmright);

    var robotelbowrightgeometry = new THREE.SphereGeometry(0.05, 32, 32);
        var robotelbowrightmaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
        var robotelbowright = new THREE.Mesh(robotelbowrightgeometry, robotelbowrightmaterial);
        robotelbowright.position.x = 0.5;
        robotelbowright.position.y = 0.75;
        robotelbowright.rotation.z = Math.PI / 3;
        robotarmright.add(robotelbowright);


    var robotforearmrightgeometry = new THREE.CylinderGeometry(0.025, 0.05, 0.2, 32);
        var robotforearmrightmaterial = new THREE.MeshStandardMaterial({ map: bellytexture });
        var robotforearmright = new THREE.Mesh(robotforearmrightgeometry, robotforearmrightmaterial);
        robotforearmright.rotation.z = Math.PI / 3;
        robotforearmright.position.x = 0.1;
        robotforearmright.position.y = -0.05;
        robotelbowright.add(robotforearmright);


    var robotrightgrippergeometry = new THREE.SphereGeometry(0.05, 32);
        var robotrightgrippermaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
        var robotrightgripper = new THREE.Mesh(robotrightgrippergeometry, robotrightgrippermaterial);
        robotrightgripper.rotation.z = Math.PI / 3;
        robotrightgripper.position.x = 0;
        robotrightgripper.position.y = -0.1;
        robotforearmright.add(robotrightgripper);


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

    
    

     

    

       
    
}