import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Service } from "@/lib/models/Service";
import { initialConsultingServices } from "@/lib/stores/servicesStore";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      let dbServices = await Service.find().sort({ createdAt: -1 }).lean();
      if (!dbServices || dbServices.length === 0) {
        // Auto-seed all 16 services
        const seedPayload = initialConsultingServices.map((s) => ({
          serviceId: s.slug || `serv-${Math.random()}`,
          title: s.title,
          slug: s.slug,
          category: s.category,
          categorySlug: s.categorySlug || "financial",
          tagline: s.tagline || "",
          shortDescription: s.shortDescription || "",
          fullDescription: s.fullDescription || "",
          deliverables: s.deliverables || s.coreDeliverables || [],
          coreDeliverables: s.coreDeliverables || s.deliverables || [],
          keyBenefits: s.keyBenefits || [],
          methodology: s.methodology || [],
          targetAudience: s.targetAudience || [],
          faqs: s.faqs || [],
          relatedSlugs: s.relatedSlugs || [],
          engagementDuration: s.engagementDuration || "Monthly Retainer",
          pricingTier: s.pricingTier || "Custom Quote",
          featured: s.featured ?? true,
          active: s.active ?? true,
          image: s.image || s.heroImage || "/images/Bookkeeping Services.jpg",
          heroImage: s.heroImage || s.image || "/images/Bookkeeping Services.jpg",
        }));

        await Service.insertMany(seedPayload);
        dbServices = await Service.find().sort({ createdAt: -1 }).lean();
      }

      return NextResponse.json({
        success: true,
        services: dbServices.map((s) => ({
          ...s,
          id: s.serviceId || s._id,
        })),
      });
    }
  } catch (err) {
    console.warn("MongoDB fetch services error, using memory fallback:", err);
  }

  return NextResponse.json({ success: true, services: initialConsultingServices });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newServiceData = {
      serviceId: slug,
      title: body.title,
      slug,
      category: body.category || "Financial Services",
      categorySlug: body.categorySlug || (body.category?.toLowerCase().includes("digital") ? "digital" : "financial"),
      tagline: body.tagline || body.shortDescription || "",
      shortDescription: body.shortDescription || "",
      fullDescription: body.fullDescription || body.shortDescription || "",
      deliverables: body.deliverables || body.coreDeliverables || [],
      coreDeliverables: body.coreDeliverables || body.deliverables || [],
      keyBenefits: body.keyBenefits || [],
      methodology: body.methodology || [],
      targetAudience: body.targetAudience || [],
      faqs: body.faqs || [],
      relatedSlugs: body.relatedSlugs || [],
      engagementDuration: body.engagementDuration || "Monthly Retainer",
      pricingTier: body.pricingTier || "Custom Quote",
      featured: body.featured ?? true,
      active: body.active ?? true,
      image: body.image || body.heroImage || "/images/Bookkeeping Services.jpg",
      heroImage: body.heroImage || body.image || "/images/Bookkeeping Services.jpg",
      createdAt: new Date().toISOString(),
    };

    try {
      const db = await connectToDatabase();
      if (db) {
        const saved = await Service.findOneAndUpdate(
          { slug },
          { $set: newServiceData },
          { upsert: true, new: true }
        );
        return NextResponse.json(
          {
            success: true,
            service: {
              ...saved.toObject(),
              id: saved.serviceId || saved._id,
            },
          },
          { status: 201 }
        );
      }
    } catch (dbErr) {
      console.warn("MongoDB create service fallback:", dbErr);
    }

    return NextResponse.json(
      {
        success: true,
        service: {
          ...newServiceData,
          id: slug,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
