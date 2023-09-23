const POINT3D = function(x, y, z) { this.x = x; this.y = y; this.z = z; };
class cube {
  constructor(width, x, y, z){ //(x,y,z) center of cube
    this.w = width;
    this.x = x;
    this.y = y;
    this.z = z;
  }
  static edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // back face
    [4, 5], [5, 6], [6, 7], [7, 4], // front face
    [0, 4], [1, 5], [2, 6], [3, 7] // connecting sides
  ];
  get vertices(){
    var v = [
      new POINT3D (this.x - this.w, this.y - this.w, this.z - this.w),
      new POINT3D(this.x + this.w, this.y - this.w, this.z - this.w),
      new POINT3D(this.x + this.w, this.y + this.w, this.z - this.w),
      new POINT3D(this.x - this.w, this.y + this.w, this.z - this.w),
      new POINT3D(this.x - this.w, this.y - this.w, this.z + this.w),
      new POINT3D(this.x + this.w, this.y - this.w, this.z + this.w),
      new POINT3D(this.x + this.w, this.y + this.w, this.z + this.w),
      new POINT3D(this.x - this.w, this.y + this.w, this.z + this.w)
    ];
    return v;
  }
}



