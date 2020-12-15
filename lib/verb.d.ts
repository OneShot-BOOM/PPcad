import { Point } from "pixi.js";

// eslint-disable-next-line max-classes-per-file
export declare module core {
    /* eslint-disable */
    export interface Point extends Array<number> { }

    export interface Vector extends Array<number> { }

    export interface KnotArray extends Array<number> { }

    export interface Matrix extends Array<Array<number>> { }

    export interface UV extends Array<number> { }

    export interface Tri extends Array<number> { }
    /* eslint-enable */

    export class Interval<T> {
        public min: T;

        public max: T;

        constructor(min: T, max: T);
    }

    /**
     * Forms a base class for serializable data types
     */
    export class ISerializable {
        public serialize(): String;
    }

    export class SerializableBase {
        public serialize(): String;
    }

    /**
     * A simple data structure representing a NURBS curve. `NurbsCurveData` does no checks for legality. You can use
     * `verb.eval.Check` for that
     */
    export class NurbsCurveData {
        public degree: number;

        public controlPoints: Array<core.Point>;

        public knots: Array<number>;

        constructor(degree: number, knots: KnotArray, controlPoints: Point[]);
    }

    /**
     * A simple data structure representing a NURBS surface. `NurbsSurfaceData` does no checks for legality. You can use
     * `verb.eval.Check` for that.
     */
    export class NurbsSurfaceData extends SerializableBase {
        // integer degree of surface in u direction
        public degreeU: number;

        // integer degree of surface in v direction
        public degreeV: number;

        // array of nondecreasing knot values in u direction
        public knotsU: KnotArray;

        // array of nondecreasing knot values in v direction
        public knotsV: KnotArray;

        // 2d array of control points, the vertical direction (u) increases from top to bottom, the v direction from left to right,
        // and where each control point is an array of length (dim)
        public controlPoints: Array<Array<Point>>;

        constructor(degreeU: number, degreeV: number, knotsU: KnotArray, knotsV: KnotArray, controlPoints: Array<Array<Point>>);
    }

    class MeshData extends SerializableBase {
        public static empty(): MeshData;

        public faces: Array<Tri>;

        public points: Array<Point>;

        public normals: Array<Point>;

        public uvs: Array<UV>;

        constructor(faces: Array<Tri>, points: Array<Point>, normals: Array<Point>, uvs: Array<UV>);
    }

    class AdaptiveRefinementOptions {
        public normTol: number;

        public minDepth: number;

        public maxDepth: number;

        public refine: boolean;

        public minDivsU: number;

        public minDivsV: number;

        constructor();
    }
}

export declare module geom {

    export class Line extends NurbsCurve {
        constructor(strat: core.Point, end: core.Point);
        public strat();
        public end();
    }

    export class Arc extends NurbsCurve {
        constructor(center: core.Point, xaxis: core.Vector, yaxis: core.Vector, radius: number, minAngle: number, maxAngle: number);
        public center(): core.Point;
        public xaxis(): core.Vector;
        public yaxis(): core.Vector;
        public radius(): number;
        public minAngle(): number;
        public maxAngle(): number;
    }

    export class Circle extends Arc {
        constructor(center: core.Point, xaxis: core.Vector, yaxis: core.Vector, radius: number)
    }

    export class EllipseArc extends NurbsCurve {
        constructor(center: core.Point, xaxis: core.Vector, yaxis: core.Vector, minAngle: number, maxAngle: number);
        public center();
        public xaxis();
        public yaxis();
        public minAngle();
        public maxAngle();
    }

    export class Ellipse extends EllipseArc {
        constructor(center: core.Point, xaxis: core.Vector, yaxis: core.Vector);
    }

    /**
     * n interface representing a Curve
     */
    export interface ICurve extends core.ISerializable {
        /**
         * Provide the NURBS representation of the curve
         *
         * **returns**
         *
         * * A NurbsCurveData object representing the curve
         */
        asNurbs(): core.NurbsCurveData;

        /**
         * obtain the parametric domain of the curve
         */
        domain(): core.Interval<number>;

        /**
         * valuate a point on the curve
         */
        point(u: number): core.Point;

        /**
         * valuate the derivatives at a point on a curve
         *
         * params*
         *
         * The parameter on the curve
         * The number of derivatives to evaluate on the curve
         *
         * returns*
         *
         * An array of derivative vector
         */
        derivatives(u: number, numDerivs?: number): Array<core.Vector>;
    }

    /**
     * A NURBS curve - this class represents the base class of many of geom's curve types and provides many tools for analysis and evaluation
     */
    export class NurbsCurve extends core.SerializableBase implements ICurve {
        /**
         * construct a NurbsCurve by degree, knots, control points, weight
         */
        public static byKnotsControlPointsWeights(
            degree: number,
            knots: core.KnotArray,
            controlPoints: Array<core.Point>,
            weights?: Array<number>,
        ): NurbsCurve;

        /**
         * construct a NurbsCurve by interpolating a collection of points.  The resultant curve
         * will pass through all of the points
         */
        public static byPoints(points: Array<core.Point>, degree?: number): NurbsCurve;

        constructor(data: core.NurbsCurveData);
        asNurbs(): core.NurbsCurveData;

        public degree(): number;

        public knots(): core.KnotArray;

        public controlPoints(): Array<core.Point>;

        public weights(): Array<number>;

        public clone(): any;

        public domain(): core.Interval<number>;

        /**
         * transform a curve with the given matrix
         */
        public transform(mat: core.Matrix): NurbsCurve;

        /**
         * sample a point at the given parameter
         */
        public point(u: number): core.Point;

        /**
         * Obtain the curve tangent at the given parameter. This is the first derivative and is not normalized
         */
        public tangent(u: number): core.Vector;

        /**
         * get derivatives at a given parameter
         *
         * params*
         *
         * The parameter to sample the curve
         * The number of derivatives to obtain
         *
         * returns*
         *
         * A point represented as an array
         */
        public derivatives(u: number, numDerivs?: number): Array<core.Vector>;

        /**
         * determine the closest point on the curve to the given point
         *
         * params*
         *
         * A length 3 array representing the point
         *
         * returns*
         *
         * The closest poin
         */
        public closestPoint(pt: core.Point): core.Point;

        /**
         * determine the closest parameter on the curve to the given point
         *
         * params*
         *
         * A length 3 array representing the point
         *
         * returns*
         *
         * The closest parameter
         */
        public closestParam(pt: core.Point): number;

        /**
         * determine the arc length of the curve
         *
         * returns*
         *
         * The length of the curve
         */
        public length(): number;

        /**
         * determine the arc length of the curve at the given paramete
         *
         * params*
         *
         * The parameter at which to evaluat
         *
         * returns*
         *
         * The length of the curve at the given paramete
         */
        public lengthAtParam(u: number): number;

        /**
         * determine the parameter of the curve at the given arc length
         *
         * params*
         *
         * The arc length at which to determine the parameter
         *
         * returns*
         *
         * The length of the curve at the given parameter
         */
        public paramAtLength(len: number, tolerance?: number): number;

        /**
         * plit the curve at the given parameter
         *
         * params*
         *
         * The parameter at which to split the curve
         *
         * returns*
         *
         * Two curves - one at the lower end of the parameter range and one at the higher end
         */
        public split(u: number): Array<NurbsCurve>;

        /**
         * everse the parameterization of the curve
         *
         * returns*
         *
         * A reversed curve
         */
        public reverse(): NurbsCurve;

        /**
         * essellate a curve at a given tolerance
         *
         * params*
         *
         * The tolerance at which to sample the curve
         *
         * returns*
         *
         * A point represented as an array
         */
        public tessellate(tolerance?: number): Array<core.Point>;
    }

    /**
     * Bezier curve is a common spline curv
     */
    export class BezierCurve extends NurbsCurve {
        /**
         * reate a bezier curv
         *
         * params*
         *
         * Array of control point
         * Array of control point weights (optional
         */
        constructor(points: core.Point[], weights?: number[]);
    }

    /**
     * An interface representing a Surface
     */
    export interface ISurface extends core.ISerializable {
        /**
         * Provide the NURBS representation of the curve
         *
         * **returns**
         *
         * * A NurbsCurveData object representing the curve
         */
        asNurbs(): core.NurbsSurfaceData;

        /**
         * Provide the domain of the surface in the U direction
         *
         * **returns**
         *
         * * An interval object with min and max properties
         */
        domainU(): core.Interval<number>;

        /**
         * Provide the domain of the surface in the V direction
         *
         * **returns**
         *
         * * An interval object with min and max properties
         */
        domainV(): core.Interval<number>;

        /**
         * Obtain a point on the surface at the given parameter
         *
         * **params**
         *
         * * The u parameter
         * * The v parameter
         *
         * **returns**
         *
         * * A point on the surface
         */
        point(u: number, v: number): core.Point;

        /**
         * Obtain the derivatives of the NurbsSurface.  Returns a two dimensional array
         * containing the derivative vectors.  Increasing U partial derivatives are increasing
         * row-wise.  Increasing V partial derivatives are increasing column-wise.  Therefore,
         * the [0][0] position is a point on the surface, [n][0] is the nth V partial derivative,
         * the [1][1] position is twist vector or mixed partial derivative Puv.
         *
         * **params**
         *
         * * The u parameter
         * * The v parameter
         * * Number of derivatives to evaluate
         *
         * **returns**
         *
         * * A two dimensional array of vectors
         */
        derivatives(u: number, v: number, numDerivs: number): Array<Array<core.Vector>>;
    }

    /**
     *  A NURBS surface - this class represents the base class of many of verb's surface types and provides many tools for analysis and evaluation.
     *  This object is deliberately constrained to be immutable. The methods to inspect the properties of this class deliberately return copies. `asNurbs` can
     *  be used to obtain a simplified NurbsCurveData object that can be used with `verb.core` or for serialization purposes.
     */
    export class NurbsSurface extends core.SerializableBase implements ISurface {
        /**
         * Construct a NurbsSurface by degree, knots, control points, weights
         *
         * **params**
         *
         * * The degree in the U direction
         * * The degree in the V direction
         * * The knot array in the U direction
         * * The knot array in the V direction
         * * Two dimensional array of points
         * * Two dimensional array of weight values
         *
         * **returns**
         *
         * * A new NurbsSurface
         */
        public static byKnotsControlPointsWeights(
            degreeU: number,
            degreeV: number,
            knotsU: core.KnotArray,
            knotsV: core.KnotArray,
            controlPoints: Array<Array<core.Point>>,
            weights?: Array<Array<number>>,
        ): NurbsSurface;

        /**
         * Construct a NurbsSurface from four perimeter points in counter-clockwise order
         *
         * **params**
         *
         * * The first point
         * * The second point
         * * The third point
         * * The fourth point
         *
         * **returns**
         *
         * * A new NurbsSurface
         */
        public static byCorners(
            point0: core.Point,
            point1: core.Point,
            point2: core.Point,
            point3: core.Point,
        ): NurbsSurface;

        /**
         * Construct a NurbsSurface by lofting between a collection of curves
         *
         * **params**
         *
         * * A collection of curves
         *
         * **returns**
         *
         * * A new NurbsSurface
         */
        public static byLoftingCurves(curves: Array<ICurve>, degreeV?: number): NurbsSurface;

        /**
         * underlying serializable, data object
         */
        private _data: core.NurbsSurfaceData;

        /**
         * Construct a NurbsSurface by a NurbsSurfaceData object
         *
         * **params**
         *
         * * The data object
         *
         * **returns**
         *
         * * A new NurbsSurface
         */
        constructor(data: core.NurbsSurfaceData);

        /**
         * The degree in the U direction
         */
        public degreeU(): number;

        /**
         * The degree in the V direction
         */
        public degreeV(): number;

        /**
         * The knot array in the U direction
         */
        public knotsU(): Array<number>;

        /**
         * The knot array in the V direction
         */
        public knotsV(): Array<number>;

        /**
         * Two dimensional array of points
         */
        public controlPoints(): Array<Array<core.Point>>;

        /**
         * Two dimensional array of weight values
         */
        public weights(): Array<Array<number>>;

        /**
         * Obtain a copy of the underlying data structure for the Surface. Used with verb.core.
         *
         * **returns**
         *
         * * A new NurbsSurfaceData object
         */
        public asNurbs(): core.NurbsSurfaceData;

        /**
         * Obtain a copy of the Surface
         *
         * **returns**
         *
         * * A new NurbsSurface
         */
        public clone(): NurbsSurface;

        /**
         * The parametric domain in the U direction
         *
         * **returns**
         *
         * * An Interval object with min and max property
         */
        public domainU(): core.Interval<number>;

        /**
         * The parametric domain in the V direction
         *
         * **returns**
         *
         * * An Interval object with min and max property
         */
        public domainV(): core.Interval<number>;

        /**
         * Obtain a point on the surface at the given parameter
         *
         * **params**
         *
         * * The u parameter
         * * The v parameter
         *
         * **returns**
         *
         * * A point on the surface
         */
        public point(u: number, v: number): core.Point;

        /**
         * Obtain the normal to the surface at the given parameter
         *
         * **params**
         *
         * * The u parameter
         * * The v parameter
         *
         * **returns**
         *
         * * A normalized vector normal to the surface
         */
        public normal(u: number, v: number): core.Point;

        /**
         * Obtain the derivatives of the NurbsSurface.  Returns a two dimensional array
         * containing the derivative vectors.  Increasing U partial derivatives are increasing
         * row-wise.  Increasing V partial derivatives are increasing column-wise.  Therefore,
         * the [0][0] position is a point on the surface, [n][0] is the nth V partial derivative,
         * the [1][1] position is twist vector or mixed partial derivative Puv.
         *
         * **params**
         *
         * * The u parameter
         * * The v parameter
         * * Number of derivatives to evaluate
         *
         * **returns**
         *
         * * A two dimensional array of vectors
         */
        public derivatives(u: number, v: number, numDerivs: number): Array<Array<core.Vector>>;

        /**
         * Get the closest parameter on the surface to a point
         *
         * **params**
         *
         * * The point
         *
         * **returns**
         *
         * * The closest point
         */
        public closestParam(pt: core.Point): core.UV;

        /**
         * Get the closest point on the surface to a point
         *
         * **params**
         *
         * * The point
         *
         * **returns**
         *
         * * The closest point
         */
        public closestPoint(pt: core.Point): core.Point;

        /**
         * Split a surface
         *
         * **params**
         *
         * * The parameter to do the split
         * * Whether to divide in V or U
         *
         * **returns**
         *
         * * A length 2 array with two new NurbsSurface objects
         */
        public split(u: number, useV: boolean): Array<NurbsSurface>;

        /**
         * Reverse the parameterization of the curve
         *
         * **params**
         *
         * * False to reverse u, true to reverse v
         *
         * **returns**
         *
         * * The reversed surface
         */
        public reverse(useV: boolean): NurbsSurface;

        /**
         * Extract an isocurve from a surface
         *
         * **params**
         *
         * * The parameter at which to obtain the isocurve
         * * False for a u-iso, true for a v-iso
         *
         * **returns**
         *
         * * A NurbsCurve in the provided direction
         */
        public isocurve(u: number, useV: boolean): NurbsCurve;

        /**
         * Extract the boundary curves from a surface
         *
         * **returns**
         *
         * * an array containing 4 elements, first 2 curves in the V direction, then 2 curves in the U direction
         */
        public boundaries(options?: core.AdaptiveRefinementOptions): Array<NurbsCurve>;

        /**
         * Tessellate the surface
         *
         * **params**
         *
         * * an AdaptiveRefinementOptions object
         *
         * **returns**
         *
         * * A MeshData object
         */
        public tessellate(options?: core.AdaptiveRefinementOptions): core.MeshData;

        /**
         * Transform a Surface with the given matrix.
         *
         * **params**
         *
         * * 4x4 array representing the transform
         *
         * **returns**
         *
         * * A new Surface
         */
        public transform(mat: core.Matrix): NurbsSurface;
    }
}
