import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

export function createAxisLine(start, end, color) {
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color });
    return new THREE.Line(geometry, material);
}

export function createTextLabel(text, position) {
    const div = document.createElement("div");
    div.textContent = text;
    div.style.color = "white";
    div.style.fontSize = "24px";
    div.style.fontWeight = "bold";
    div.style.fontFamily = "Arial";
    div.style.textShadow = "0 0 4px black";

    const label = new CSS2DObject(div);
    label.position.copy(position);
    return label;
}

export function buildLabeledAxes(axisGroup, labels) {
    while (axisGroup.children.length > 0) {
        const child = axisGroup.children[0];
        axisGroup.remove(child);
    }

    const origin = new THREE.Vector3(0, 0, 0);

    const xAxis = createAxisLine(origin, new THREE.Vector3(1.1, 0, 0), 0xff0000);
    const yAxis = createAxisLine(origin, new THREE.Vector3(0, 1.1, 0), 0x00ff00);
    const zAxis = createAxisLine(origin, new THREE.Vector3(0, 0, 1.1), 0x0000ff);

    axisGroup.add(xAxis, yAxis, zAxis);

    axisGroup.add(createTextLabel(labels[0], new THREE.Vector3(1.15, 0, 0)));
    axisGroup.add(createTextLabel(labels[1], new THREE.Vector3(0, 1.15, 0)));
    axisGroup.add(createTextLabel(labels[2], new THREE.Vector3(0, 0, 1.15)));

    const grid = new THREE.GridHelper(1, 10, 0x444444, 0x444444);
    grid.position.set(0.5, 0, 0.5);
    axisGroup.add(grid);
}