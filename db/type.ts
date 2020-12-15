import { core } from "../lib/verb";

export class Scale3d {

    /*
    Returns the X direction scale.
    */
    public X: number | undefined;

    /*
    Returns the Y direction scale.
    */
    public Y: number | undefined;

    /*
    Returns the Z direction scale.
    */
    public Z: number | undefined;

}

export class FitData {

    /*
    Accesses the degree of spline.
    */
    public Degree: number | undefined;

    /*
    Accesses the start tangent of spline
    */
    public StartTangent: core.Vector | undefined;

    /*
    Accesses the end tangent of spline.
    */
    public EndTangent: core.Vector | undefined;


    /*
    Accesses the fit tolerance of spline
    */
    public FitTolerance: number | undefined;

    /*
    Assesses whether or not specific tangents exist at the endpoints.
    */
    public TangentsExist: boolean | undefined;

}

export class NurbsData {

    /*
    Assesses if the spline is closed.
    */
    public Closed: boolean | undefined;

    /*
    Accesses the control points (in WCS coordinates) of the spline.
    */
    public ControlPointTolerance: number | undefined;

    /*
    Accesses the degree of spline.
    */
    public Degree: number | undefined;

    /*
    Accesses the knot value tolerance of spline
    */
    public KnotTolerance: number | undefined;
    /*
    Assesses if the spline is periodic. A periodic spline is a spline with period T such that the point at parameter t + T is equal to the point at parameter t for any value of t.
    */
    public Periodic: boolean | undefined;

    /*
    Assesses if the spline is rational.
    */
    public Rational: boolean | undefined;



}

export class Color {

    public ColorIndex: number | undefined;
    public Color: number | undefined;
}

export class EntityColor {

    /*
    Accesses the color value's blue component. 
    */
    public Blue: number | undefined;

    /*
    Accesses the color value's red component. 
    */
    public Red: number | undefined;

    /*
    Accesses the color value's green component. 
    */
    public Green: number | undefined;

    /*
     Accesses the color method.
    */
    public ColorMethod: ColorMethod | undefined;

    /*
    Assesses if there is no color. 
    */
    public IsNone: boolean | undefined;

    /*
    Assesses if the color is from the foreground.
    */
    public IsForeground: boolean | undefined;

    /*
    Assesses if the color is by a pen.
    */
    public IsByPen: boolean | undefined;

    /*
    Wrap the ObjectARX function AcCmColor.isByLayer(). Assesses if the color method is EntityColor.ByLayer, or if the color method is EntityColor.ByACI and the ACI is EntityColor.ACIbyLayer. 
    */
    public IsByLayer: boolean | undefined;

    /*
    Assesses if the color is by another color.
    */
    public IsByColor: boolean | undefined;

    /*
    Assesses if the color is by a block.
    */
    public IsByBlock: boolean | undefined;

    /*
    Assesses if the color is defined by ACI.
    */
    public IsByAci: boolean | undefined;

    /*
    Assesses if the layer is frozen.
    */
    public IsLayerFrozen: boolean | undefined;

    /*
    For internal use only.
    */
    public IsLayerFrozenOrOff: boolean | undefined;

    /*
    Assesses if the layer is off.
    */
    public IsLayerOff: boolean | undefined;

    /*
    Assesses the pen index. 
    */
    public PenIndex: number | undefined;

    /*
    Assesses the layer index. 
    */
    public LayerIndex: number | undefined;
}


export class AttributeCollection {

    /*
    Accesses the number of items in the collection.
    */
    public Count: number | undefined;

}


export enum SplineType {
    FitPoints = 0,
    ControlPoints = 1
}

export enum ColorMethod {
    ByAci = 0xc3, //ACI index in mRGBM.indirect 
    ByBlock = 0xc1, //Block color 
    ByColor = 0xc2, //blue, green, red, and colorMethod members of mRGBM 
    ByLayer = 0xc0, //Layer index in mRGBM.indirect
    ByPen = 0xc4, //Pen index in mRGBM.indirect
    Foreground = 0xc5, //Foreground color
    LayerFrozen = 0xc7, //Layer index in mRGBM.indirect
    LayerOff = 0xc6, //The color method is LayerOff.
    None = 200 //Only mRGBM.colorMethod is valid 
}


