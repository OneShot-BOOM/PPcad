import { Graphics } from "pixi.js"
import { Entity } from "../db/Entity"
import * as Curve from "../db/Curve";
import { core } from "../lib/verb";

export class PixiDraw {

    public static DrawPixi(entity: Entity): Graphics {
        const graphics = new Graphics();
        if (entity instanceof Curve.Line) {
        }
        else if (entity instanceof Curve.Arc) {
        }
        else if (entity instanceof Curve.Circle) {
        }
        else if (entity instanceof Curve.Polyline) {
        }
        else if (entity instanceof Curve.Ellipse) {
        }
        else if (entity instanceof Curve.Spline) {
        }
        else if (entity instanceof Curve.Xline) {
        }

        return graphics;
    }

    public static DrawPixiLine(startpoint: Curve.Point2d, endpoint: Curve.Point2d, thickness: number = 1): Graphics {
        let line = new Graphics();
        line.lineStyle(thickness);
        line.line.native = true;
        line.moveTo(0, 0)
        line.lineTo(1000, 1000)

        //app.stage.addChild(line);
        return line;
    }

    public static DrawPixiCrcle(center: Curve.Point2d, radius: number, thickness: number): Graphics {
        let circle = new Graphics();
        circle.lineStyle(thickness);
        circle.drawCircle(center.X, center.Y, radius)
        circle.endFill();
        //app.stage.addChild(circle);
        return circle;
    }

    public static DrawPixiArc(center: Curve.Point2d, radius: number, startAngle: number, endAngle: number, thickness: number): Graphics {
        let arc = new PIXI.Graphics();
        arc.lineStyle(thickness);
        arc.arc(center.X, center.Y, radius, startAngle, endAngle, true);
        arc.endFill();
        //app.stage.addChild(arc);
        return arc;
    }

    public static DrawPixiEllipses(center: Curve.Point2d, majorRadius: number, minorRadius: number, radiusRatio: number, thickness: number, MinorAxis: core.Vector, MajorAxis: core.Vector): Graphics {
        let ellipse = new Graphics();
        //cos<夹角> = 两向量之积 / 两向量模的乘积
        // <夹角> = arccos( 两向量之积 / 两向量模的乘积 )
        ellipse.lineStyle(thickness);
        if (radiusRatio < 1) {
            ellipse.drawEllipse(center.X, center.Y, majorRadius, minorRadius);
            ellipse.setTransform(center.X, center.Y, 1, 1, Math.PI / 4, 0, 0, center.X, center.Y);
        }
        else {
            ellipse.drawEllipse(center.X, center.Y, minorRadius, majorRadius);
            ellipse.setTransform(center.X, center.Y, 1, 1, Math.PI / 4, 0, 0, center.X, center.Y);
        }
        ellipse.endFill();
        //app.stage.addChild(ellipse);
        return ellipse;
    }

    public static DrawPixiPolyline(startpoint: Curve.Point2d, endpoint: Curve.Point2d, thickness: number = 1, numberOfVertices: number, isOnlyLines: boolean): Graphics {
        let line = new Graphics();
        line.lineStyle(thickness);
        line.line.native = true;
        line.moveTo(startpoint.X, startpoint.Y)
        for (let i = 0; i < numberOfVertices; i++) {
            if (isOnlyLines) {
                line.lineTo(1000, 1000)
                line.lineTo(1000, 1000)
                line.lineTo(1000, 1000)
            }
        }
        //app.stage.addChild(line);
        return line;
    }


}




