
import { connectToDatabase, Lead } from '@/lib/mongodb';

export type LeadType = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
  created_at?: string;
};

export async function createLead(leadData: LeadType) {
  try {
    await connectToDatabase();
    const newLead = new Lead({
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      service: leadData.service,
      message: leadData.message,
      created_at: new Date()
    });
    
    const savedLead = await newLead.save();
    return {
      id: savedLead._id.toString(),
      name: savedLead.name,
      email: savedLead.email,
      phone: savedLead.phone,
      service: savedLead.service,
      message: savedLead.message,
      created_at: savedLead.created_at.toISOString()
    };
  } catch (error) {
    console.error("Error creating lead:", error);
    throw error;
  }
}

export async function getLeads() {
  try {
    await connectToDatabase();
    const leads = await Lead.find().sort({ created_at: -1 }).exec();
    return leads.map(doc => ({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      service: doc.service,
      message: doc.message,
      created_at: doc.created_at.toISOString()
    }));
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
}
