import { Entity } from "./Entity";
import { core } from "../lib/verb";
import * as type from "./type";




export class BlockReference extends Entity {

    /*
    Returns the name of the associated BlockTableRecord.
    */
    public Name: string | undefined;

    /*
    Accesses the position value (often referred to as the insertion point), in WCS coordinates.
    */
    public Position: core.Point | undefined;

    /*
    Accesses the rotation value (in radians) of the block reference. The rotation value is relative to the X axis of a coordinate system that is parallel to the OCS of the block reference, 
    but has its origin at the position point of the block reference. The rotation axis is the Z axis of this coordinate system with positive rotations going counterclockwise when looking down the Z axis towards the origin.
    */
    public Rotation: number | undefined;

    /*
    Accesses the normal vector (in WCS coordinates) of the plane containing the block reference.
    */
    public Normal: core.Vector | undefined;

    /*
    Accesses the block reference to use the X, Y, and Z scale factors contained in scale.
    */
    public ScaleFactors: type.Scale3d | undefined;

    /*
    Accesses the object ID of the BlockTableRecord referenced by the block reference.
    */
    //public BlockTableRecord: ObjectId | undefined;
    public BlockTableRecord: number | undefined;

    /*
    Accesses the block reference’s position (insertion point), normal vector, scale factors, and rotation so that the resulting MCS-to-drawing-WCS transform is the same as the transform matrix. MCS is the WCS within the block table record’s microspace.
    */
    public BlockTransform: core.Matrix | undefined;

    /*
    Returns the AttributeCollection property value.
    */
    public AttributeCollection: type.AttributeCollection | undefined;


}