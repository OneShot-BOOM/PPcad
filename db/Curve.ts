import { Entity } from "./Entity";
import { core } from "../lib/verb";
import * as type from "./type";
import { Graphics } from 'pixi.js';
import { PixiDraw  } from "../graphics/PixiDrawFun"

export class Curve extends Entity {

    /*
    Accesses the area of the curve.
    */
    public Area: number | undefined;

    /*
    Returns true if the curve is closed.
    */
    public Closed: boolean | undefined;

    /*
    Returns the parameter of the start of the curve
     */
    public StartParam: number | undefined;

    /*
    Returns the starting point of the curve
    */
    public StartPoint: Point2d | undefined;

    /*
    Accesses the parameter of the endpoint of the curve.
    */
    public EndParam: number | undefined;

    /*
    Accesses the end point (in WCS coordinates) of the curve.
    */
    public EndPoint: Point2d | undefined;

    /*
    Returns true if the curve is periodic.
    */
    public IsPeriodic: boolean | undefined;

    /*
    Returns pointing to a spline approximation of the curve
    */
    public Spline: Spline | undefined;

}


export class Line extends Curve {
    /*
    Accesses the angle of the line expressed in radians relative to the world coordinate system.
    */
    public Angle: number | undefined;

    public DxfName = "Line";
    /*
    Accesses the vector formed by start and end points of the line.
    */
    public Delta: core.Vector | undefined;

    /*
    Accesses the line's start point in WCS coordinates.
    */
    /*
    Accesses the line's start point in WCS coordinates.
    */

    public StartPoint!: Point2d;

    /*
    Accesses the line's endpoint in WCS coordinates.
    */
    /*
    Accesses the line's endpoint in WCS coordinates.
    */

    public EndPoint!: Point2d;

    /*
    Accesses the length of the line.
    */
    public Length: number | undefined;

    /*
    Accesses the line's unit normal vector in WCS coordinates.
    */
    public Normal: core.Vector | undefined;

    /*
    Accesses the line's thickness value. The thickness is the line's dimension along its normal vector direction (sometimes called the extrusion direction).
    */
    public Thickness: number | undefined;

    public draw(): Graphics 
    {
        return  PixiDraw.DrawPixi(this);

    }
}


export class Arc extends Curve {
    public DxfName = "Arc";
    /*
    Accesses the center to be the center point for the arc; it must be in WCS coordinates.
    */
    public Center: core.Point | undefined;

    /*
    Accesses the radius of the arc.
    */
    public Radius: number | undefined;

    /*
    Accesses the length of the arc.
    */
    public Length: number | undefined;

    /*
    Accesses the normal vector of the plane containing the arc. normal must be in WCS coordinates and must be non-zero length.
    */
    public Normal: core.Vector | undefined;

    /*
    Accesses the arc’s thickness
    */
    public Thickness: number | undefined;

    /*
    Accesses the the start angle of the arc, which must be in radians.
    */
    public StartAngle: number | undefined;

    /*
    Accesses the end angle of the arc, which must be in radians.
    */
    public EndAngle: number | undefined;

    /*
    Accesses the angle sweep of the arc segment.
    */
    public TotalAngle: number | undefined;
}


export class Circle extends Curve {
    
    public DxfName = "Circle";
    /*
    Accesses the center point.
    */
    public Center!: Point2d;

    /*
    Accesses the radius. 
    */
    public Radius: number | undefined;

    /*
    Accesses the circumference of the circle.
    */
    public Circumference: number | undefined;

    /*
    Accesses the diameter of the circle.
    */
    public Diameter: number | undefined;

    /*
    Accesses a vector which is at a normal to the center.
    */
    public Normal: core.Vector | undefined;

    /*
    Accesses the thickness of the circumference.
    */
    public Thickness: number | undefined;
}


export class Polyline extends Curve {
    public DxfName = "Polyline";

    /*
    Accesses whether the polyline should be closed (that is, there is a segment drawn from the last vertex to the first) or not.
    */
    public Closed: boolean | undefined;

    /*
    Accesses the total length of the polyline.
    */
    public Length: number | undefined;

    /*
    Accesses the number of vertices in the polyline
    */
    public NumberOfVertices: number | undefined;

    /*
    Accesses the normal (in WCS coordinates) to the plane containing the polyline.
    */
    public Normal: core.Vector | undefined;

    /*
    If true, the polyline displays its linetype across vertices
    */
    public Plinegen: number | undefined;

    /*
    Accesses the thickness (extrusion depth or height) of the polyline.
    */
    public Thickness: number | undefined;

    /*
    Assesses if there are only lines in the polyline.
    */
    public IsOnlyLines: number | undefined;

    /*
    Assesses if the polyline has any width values set for any of the segments. Width values are required for varying width segments within the polyline
    */
    public HasWidth: boolean | undefined;

    /*
    Assesses if the polyline has any bulge factors set for any of the segments. Bulge factor values are required for arc segments within the polyline.
    */
    public HasBulges: boolean | undefined;

    /*
    Accesses the distance of the polyline's plane from the WCS origin.
    */
    public Elevation: number | undefined;

    /*
    Accesses the polyline's constant width.
    */
    public ConstantWidth: number | undefined;


}


export class Ellipse extends Curve {
    public DxfName = "Ellipse";
    /*
    Accesses the center point of the ellipse
    */
    public Center!: Point2d;

    /*
    Accesses the ratio of the ellipse's major radius to its minor radius. The value will be in the range 1e-6 to 1.0.
    */
    public RadiusRatio: number | undefined;

    /*
    Accesses the vector normal to this ellipse.
    */
    public Normal: core.Vector | undefined;

    /*
    Accesses the first period equivalent of the start angle (in radians) of the ellipse. The angle will be in the range -pi to pi. 
    The ellipse's majorAxis vector is the zero angle for startAngle and endAngle. Positive angles are counter-clockwise when looking down the normal vector (that is, right-hand rule).
    */
    public StartAngle: number | undefined;

    /*
    Accesses the new start parameter
    */
    public StartParam: number | undefined;

    /*
    Accesses the end angle of the ellipse.
     */
    public EndAngle: number | undefined;

    /*
    Accesses the end parameter of the ellipse.
    */
    public EndParam: number | undefined;

    /*
    Accesses the major axis  of the ellipse.
    */
    public MinorAxis: core.Vector | undefined;

    /*
    Accesses the minor radius of the ellipse.
    */
    public MinorRadius: number | undefined;

    /*
    Accesses the major axis of the ellipse.
    */
    public MajorAxis: core.Vector | undefined;

    /*
    Accesses the major radius of the ellipse.
    */
    public MajorRadius: number | undefined;

    /*
    Assesses if this Ellipse has no gelib object within itself.
    */
    public IsNull: boolean | undefined;
}


export class Spline extends Curve {
    public DxfName = "Spline";
    /*
    Returns the degree of the spline's polynomial representation. The value is in the range 1 to 25.
    */
    public Degree: number | undefined;

    /*
    Returns the start point and end point tangent vectors in WCS coordinates.
    */
    public EndFitTangent: core.Vector | undefined;

    /*
    Returns all the fit points (in WCS coordinates), fit tolerance, and, if tangents exist, the start and end tangents of the spline.
    */
    public FitData: type.FitData | undefined;

    /*
    Returns the tolerance value used for curve fitting. This is the maximum distance (in drawing units) that the spline curve is allowed to deviate from the fit points.
    */
    public FitTolerance: number | undefined;

    /*
    Returns true if and only if the spline has fit data associated with it.
    */
    public HasFitData: number | undefined;

    /*
    Returns true if this Spline object does not have an gelib object within it.
    */
    public IsNull: boolean | undefined;

    /*
    Returns true if the object lies completely within a plane.
    */
    public IsPlanar: boolean | undefined;

    /*
    Returns true if and only if the spline is rational.
    */
    public IsRational: boolean | undefined;

    /*
    Returns the number of control points in the spline.
    */
    public NumControlPoints: number | undefined;

    /*
    Returns the number of fit points associated with the spline. 
    Warning Do not call this function unless the spline has fit data (that is, Spline.hasFitData() is true). 
    */
    public NumFitPoints: number | undefined;

    /*
    Replaces any existing spline data with the data passed in via NurbsData parameters.
    */
    public NurbsData: type.NurbsData | undefined;

    /*
    Returns the start point of tangent vector in WCS coordinates.
    */
    public StartFitTangent: core.Vector | undefined;

    /*
    This wraps AcDbSpline::type() and AcDbSpline::setType() methods.
    */
    public Type: type.SplineType | undefined;




}


export class Xline extends Curve {
    public DxfName = "Xline";
    /*
    Accesses the base point of the ray.
    */
    public BasePoint: core.Point | undefined;

    /*
    Accesses the second alignment point.
    */
    public SecondPoint: core.Point | undefined;

    /*
    Accesses the unit direction vector of the ray.
    */
    public UnitDir: core.Vector | undefined;
}

export class Point2d  {

    public X=0;
    public Y=0;
    //public Z: number | undefined;
 
}




